import * as vscode from "vscode";
import { getFunctionNode } from "./main";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    "remove-function-vscode-extension.remove",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const code = editor.document.getText();
      const cursorIndex = editor.document.offsetAt(editor.selection.active);
      const functionNode = getFunctionNode(code, cursorIndex);
      console.log('%c [ extension.ts ---> functionNode ]: ', 'color: blue;', functionNode);
      if (!functionNode) {
        return;
      }

      editor.edit((editBuilder) => {
        editBuilder.delete(
          new vscode.Range(
            new vscode.Position(
              functionNode?.start.line - 1,
              functionNode?.start.column
            ),
            new vscode.Position(
              functionNode?.end.line,
              functionNode?.end.column
            )
          )
        );
      });
    }
  );
}

export function deactivate() {}
