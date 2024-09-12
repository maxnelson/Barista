export const formatDecimal = (propertyValue) => {
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
