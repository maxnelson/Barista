import { createFilter } from "@rollup/pluginutils";
import path from "path";
import glob from "fast-glob";
import { handleClassnamesArray } from "./src/handleClassnamesArray.js";
import { extractClassnames } from "./src/classnameExtractor/extractClassnames.js";

export default function baristaCSS(options = {}) {
  const filter = createFilter(
    options.include || /\.(js|ts|jsx|tsx|html)$/,
    options.exclude
  );
  const delimiter1 = options.delimiter1 || "_";
  const delimiter2 = options.delimiter2 || "--";
  const outputFilepath = options.outputFilepath;
  let classNames = new Set();
  return {
    name: "vite-plugin-classname-extractor",

    configureServer(server) {
      server.watcher.on("change", async (file) => {
        if (file.endsWith(outputFilepath)) {
          return [];
        } else {
          testFunc(classNames, options, filter, delimiter1, delimiter2);
        }
      });
    },
    async buildStart() {
      testFunc(classNames, options, filter, delimiter1, delimiter2);
    },
  };
}

export const testFunc = async (
  classNames,
  options,
  filter,
  delimiter1,
  delimiter2
) => {
  console.log("TEST IF THIS IS FIRING1234");
  const files = await glob(options.include || "src/**/*.{js,ts,jsx,tsx,html}", {
    ignore: options.exclude,
    absolute: true,
  });
  for (const file of files) {
    if (filter(file)) {
      await extractClassnames(file, classNames);
      await handleClassnamesArray(
        classNames,
        options.outputFilepath,
        delimiter1,
        delimiter2
      );
    }
  }
};
