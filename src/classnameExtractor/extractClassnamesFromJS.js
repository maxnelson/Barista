import { parse } from "@babel/parser";
import * as babel from "@babel/core";

export const extractClassnamesFromJS = (content, classNames) => {
  const ast = parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const extractFromNode = (node) => {
    if (node.type === "StringLiteral") {
      node.value.split(/\s+/).forEach((cls) => cls && classNames.add(cls));
    } else if (node.type === "TemplateLiteral") {
      node.quasis.forEach((quasi) =>
        quasi.value.raw
          .split(/\s+/)
          .forEach((cls) => cls && classNames.add(cls))
      );
    } else if (node.type === "BinaryExpression") {
      extractFromNode(node.left);
      extractFromNode(node.right);
    }
  };

  babel.traverse(ast, {
    AssignmentExpression(path) {
      if (
        path.node.left.type === "MemberExpression" &&
        path.node.left.property.name === "className"
      ) {
        extractFromNode(path.node.right);
      }
    },
    ObjectProperty(path) {
      if (path.node.key.name === "className") {
        extractFromNode(path.node.value);
      }
    },
  });
};
