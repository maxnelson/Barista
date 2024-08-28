import path from "path";
import { appendFileSync, writeFileSync } from "fs";

export const handleClassnamesArray = (
  classNamesArray,
  outputFilepath,
  delimiter1,
  delimiter2
) => {
  const fullPath = path.resolve(outputFilepath);
  let CSSRules = "";
  if (!Array.isArray(classNamesArray)) {
    classNamesArray = Array.from(classNamesArray);
  }
  for (let className of classNamesArray) {
    if (className.startsWith(delimiter1)) {
      const delimiterIndex = className.indexOf(delimiter2);
      const propertyName = className.slice(1, delimiterIndex);
      const propertyValue = className.slice(delimiterIndex + 2);
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
  writeFileSync(fullPath, CSSRules, "utf-8");
};
