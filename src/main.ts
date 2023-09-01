import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
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
  });

  return functionNode;
}
