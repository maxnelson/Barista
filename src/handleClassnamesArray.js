import path from "path";
import {
  appendFileSync,
  writeFileSync,
  writeSync,
  openSync,
  closeSync,
} from "fs";

export const handleClassnamesArray = async (
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
      let propertyValue = className.slice(delimiterIndex + 2);
      const varIndex = propertyValue.indexOf("var");
      if (!(varIndex === -1)) {
        propertyValue = formatVar(propertyValue, varIndex);
      }
      propertyValue = propertyValue.replaceAll("_", " ");
      propertyValue = propertyValue.replaceAll("percent", "%");
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

  const fullPathOpen = openSync(outputFilepath, "w");
  writeSync(fullPathOpen, CSSRules, "utf-8");
  closeSync(fullPathOpen);

  //writeFileSync(fullPath, "");
  //writeFileSync(fullPath, CSSRules, "utf-8");
};

const formatVar = (propertyValue, varIndex) => {
  let varValue = propertyValue.slice(varIndex);
  varValue = varValue.replace("_", "(");
  varValue = varValue.replace("_", ")");
  propertyValue = propertyValue.slice(0, varIndex) + varValue;
  return propertyValue;
};
