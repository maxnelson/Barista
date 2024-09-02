import { parse } from "@babel/parser";
import * as babel from "@babel/core";

export const extractClassnamesFromJSX = (content, classNames) => {
  const ast = parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const extractFromNode = (node) => {
    if (node.type === "StringLiteral") {
      node.value.split(/\s+/).forEach((cls) => cls && classNames.add(cls));
    } else if (node.type === "BinaryExpression") {
      extractFromNode(node.left);
      extractFromNode(node.right);
    } else if (node.type === "ConditionalExpression") {
      extractFromNode(node.consequent);
      extractFromNode(node.alternate);
    } else if (node.type === "TemplateLiteral") {
      node.quasis.forEach((quasi) =>
        quasi.value.raw
          .split(/\s+/)
          .forEach((cls) => cls && classNames.add(cls))
      );
    }
  };

  babel.traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name === "className") {
        if (path.node.value.type === "StringLiteral") {
          extractFromNode(path.node.value);
        } else if (path.node.value.type === "JSXExpressionContainer") {
          extractFromNode(path.node.value.expression);
        }
      }
    },
  });
};
