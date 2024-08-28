import { parse } from "@babel/parser";
import * as babel from "@babel/core";

export const extractClassnamesFromJSX = (content, classNames) => {
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
};
