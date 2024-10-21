const isNumber = (char) => !isNaN(parseInt(char, 10));

export const formatDecimal = (propertyValue) => {
  let indexOfP = propertyValue.indexOf("p");
  let condition0 = indexOfP !== -1;
  let condition1 = isNumber(propertyValue[indexOfP - 1]);
  let condition2 = isNumber(propertyValue[indexOfP + 1]);

  if (condition0 && condition1 && condition2) {
    propertyValue = propertyValue.replaceAll("p", ".");
  }
  return propertyValue;
};

export const formatVar = (propertyValue) => {
  const varIndex = propertyValue.indexOf("var");
  if (!(varIndex === -1)) {
    let varValue = propertyValue.slice(varIndex);
    varValue = varValue.replace("_", "(--");
    varValue = varValue.replace("_", ")");
    propertyValue = propertyValue.slice(0, varIndex) + varValue;
  }

  return propertyValue;
};
