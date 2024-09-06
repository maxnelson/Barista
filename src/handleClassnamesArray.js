import path from "path";
import {
  appendFileSync,
  writeFileSync,
  writeSync,
  openSync,
  closeSync,
  existsSync,
  mkdirSync,
} from "fs";

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

  const outputDir = path.dirname(outputFilepath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  writeFileSync(outputFilepath, CSSRules);

  /*
  const fullPathOpen = openSync(outputFilepath, "w");
  writeSync(fullPathOpen, CSSRules, "utf-8");
  closeSync(fullPathOpen);
  */
};

const formatDecimal = (propertyValue) => {
  let indexOf0p = propertyValue.indexOf("0p");
  if (
    !(
      indexOf0p !== -1 &&
      (propertyValue[indexOf0p + 2] === "x" ||
        propertyValue[indexOf0p + 2] === "c")
    )
  ) {
    propertyValue = propertyValue.replaceAll("0p", "0.");
  }
  return propertyValue;
};

const formatVar = (propertyValue, varIndex) => {
  let varValue = propertyValue.slice(varIndex);
  varValue = varValue.replace("_", "(");
  varValue = varValue.replace("_", ")");
  propertyValue = propertyValue.slice(0, varIndex) + varValue;
  return propertyValue;
};
