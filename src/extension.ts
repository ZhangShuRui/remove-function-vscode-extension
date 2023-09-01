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

      if (!functionNode) {
        return;
      }

      editor.edit((editBuilder) => {
        editBuilder.delete(
          new vscode.Range(
            new vscode.Position(
              functionNode?.start.line - 1,
              functionNode?.start.colume
            ),
            new vscode.Position(
              functionNode?.end.line,
              functionNode?.end.colume
            )
          )
        );
      });
    }
  );
}

export function deactivate() {}
