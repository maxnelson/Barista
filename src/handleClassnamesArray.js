import path from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import {
  formatDecimal,
  formatVar,
} from "./propertyValueFilters/propertyValueFilters.js";
export const handleClassnamesArray = async (
  classNamesArray,
  outputFilepath,
  delimiter1,
  delimiter2
) => {
  let CSSRules = "";
  if (!Array.isArray(classNamesArray)) {
    classNamesArray = Array.from(classNamesArray);
  }
  for (let className of classNamesArray) {
    if (
      className.startsWith(delimiter1) &&
      className.length > 1 &&
      className.includes(delimiter2)
    ) {
      const delimiterIndex = className.indexOf(delimiter2);
      const propertyName = className.slice(1, delimiterIndex);
      let propertyValue = className.slice(delimiterIndex + 2);

      propertyValue = formatVar(propertyValue);

      propertyValue = propertyValue.replaceAll("_", " ");
      propertyValue = propertyValue.replaceAll("percent", "%");
      propertyValue = formatDecimal(propertyValue);

      CSSRules +=
        "." +
        className +
        " {\n  " +
        propertyName +
        ": " +
        propertyValue +
        ";\n}\n";
    }
  }

  const outputDir = path.dirname(outputFilepath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  writeFileSync(outputFilepath, CSSRules);
  console.log("Test 787878");
};
