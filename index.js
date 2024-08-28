import { createFilter } from "@rollup/pluginutils";
import { parse } from "@babel/parser";
import * as babel from "@babel/core";
import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";

export default function classnameExtractor(options = {}) {
  const filter = createFilter(
    options.include || /\.(js|ts|jsx|tsx|html)$/,
    options.exclude
  );
  let classNames = new Set();

  return {
    name: "vite-plugin-classname-extractor",

    configureServer(server) {
      server.watcher.on("change", async (file) => {
        if (filter(file)) {
          console.log(`File changed: ${file}`);
          await extractClassNames(file);
          console.log("Updated classnames:", Array.from(classNames).join(", "));
        }
      });
    },

    async buildStart() {
      console.log("Build starting, searching for files...");
      const files = await glob(
        options.include || "src/**/*.{js,ts,jsx,tsx,html}",
        {
          ignore: options.exclude,
          absolute: true,
        }
      );
      console.log(`Found ${files.length} files to process`);
      for (const file of files) {
        if (filter(file)) {
          console.log(`Processing file: ${file}`);
          await extractClassNames(file);
        }
      }
      console.log("Initial classnames:", Array.from(classNames).join(", "));
    },
  };

  async function extractClassNames(file) {
    try {
      const content = await fs.readFile(file, "utf-8");
      console.log(`File content length: ${content.length} characters`);

      const extension = path.extname(file);
      if ([".js", ".ts", ".jsx", ".tsx"].includes(extension)) {
        extractFromJSX(content);
      } else if (extension === ".html") {
        extractFromHTML(content);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }

  function extractFromJSX(content) {
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    babel.traverse(ast, {
      JSXAttribute(path) {
        if (path.node.name.name === "className") {
          if (path.node.value.type === "StringLiteral") {
            path.node.value.value
              .split(/\s+/)
              .forEach((cls) => classNames.add(cls));
          } else if (
            path.node.value.type === "JSXExpressionContainer" &&
            path.node.value.expression.type === "TemplateLiteral"
          ) {
            path.node.value.expression.quasis.forEach((quasi) =>
              quasi.value.raw
                .split(/\s+/)
                .forEach((cls) => cls && classNames.add(cls))
            );
          }
        }
      },
    });

    console.log(
      "Extracted classnames from JSX:",
      Array.from(classNames).join(", ")
    );
  }

  function extractFromHTML(content) {
    // Simple regex-based extraction for HTML
    const classRegex = /class=["']([^"']+)["']/g;
    let match;
    while ((match = classRegex.exec(content)) !== null) {
      match[1].split(/\s+/).forEach((cls) => classNames.add(cls));
    }
    console.log(
      "Extracted classnames from HTML:",
      Array.from(classNames).join(", ")
    );
  }
}
