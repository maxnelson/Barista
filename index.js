import { createFilter } from "@rollup/pluginutils";
import { parse } from "@babel/parser";
import * as babel from "@babel/core";
import path from "path";
import fs from "fs/promises";
import { existsSync, writeFileSync, appendFileSync } from "fs";
import glob from "fast-glob";
import { handleClassnamesArray } from "./src/handleClassnamesArray.js";
import { extractClassnames } from "./src/classnameExtractor/extractClassnames.js";

export default function baristaCSS(options = {}) {
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
          await extractClassnames(file, classNames);
          handleClassnamesArray(
            classNames,
            options.outputFilepath,
            options.delimiter1,
            options.delimiter2
          );
        }
      });
    },
    async buildStart() {
      const fullPath = path.resolve(options.outputFilepath);
      //writeFileSync(fullPath, "", "utf-8");
      //appendFileSync(fullPath, "some text", "utf-8");
      const files = await glob(
        options.include || "src/**/*.{js,ts,jsx,tsx,html}",
        {
          ignore: options.exclude,
          absolute: true,
        }
      );
      for (const file of files) {
        if (filter(file)) {
          await extractClassnames(file, classNames);
          handleClassnamesArray(
            classNames,
            options.outputFilepath,
            options.delimiter1,
            options.delimiter2
          );
        }
      }
    },
  };
}
