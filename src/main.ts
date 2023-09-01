import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { FunctionNode } from "./interface";

export function getFunctionNode(
  code: string,
  index: number
): FunctionNode | undefined {
  let functionNode;
  const ast = parse(code, { sourceType: "module" });

  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FunctionDeclaration(path) {
      if (index >= path.node.start! && index <= path.node.end!) {
        functionNode = {
          name: path.node.id?.name!,
          start: path.node.loc?.start,
          end: path.node.loc?.end!,
        };
      }
    },

    // eslint-disable-next-line @typescript-eslint/naming-convention
    ArrowFunctionExpression(path) {
      const variableDeclarationPath = path.parentPath.parentPath;

      if (!variableDeclarationPath) {
        return;
      }

      if (variableDeclarationPath.isVariableDeclaration()) {
        if (
          index >= variableDeclarationPath.node.start! &&
          index <= variableDeclarationPath.node.end!
        ) {
          functionNode = {
            name: getArrowFunctionName(path),
            start: variableDeclarationPath.node.loc?.start,
            end: variableDeclarationPath.node.loc?.end!,
          };
        }
      }
    },
  });

  return functionNode;
}

function getArrowFunctionName(path: NodePath) {
  const parentPath = path.parentPath;
  if (!parentPath) {
    return;
  }

  return Object.keys(parentPath.getBindingIdentifiers())[0];
}
