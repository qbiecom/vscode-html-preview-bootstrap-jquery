import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let currentPanel: vscode.WebviewPanel | undefined = undefined;

    let disposable = vscode.commands.registerCommand('html-preview-with-bootstrap-jquery.preview', () => {

        // Read the user's settings
        const config = vscode.workspace.getConfiguration('htmlPreview');
        const bootstrapVersion = config.get('bootstrapVersion');
        const jqueryVersion = config.get('jqueryVersion');

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active HTML file.");
            return; // Exit if no active editor
        }

        const columnToShowIn = vscode.ViewColumn.Beside;

        if (currentPanel) {
            currentPanel.reveal(columnToShowIn);
        } else {
            currentPanel = vscode.window.createWebviewPanel(
                'htmlPreview',
                'HTML Preview',
                columnToShowIn,
                { enableScripts: true, retainContextWhenHidden: true }
            );

            currentPanel.onDidDispose(() => currentPanel = undefined, null, context.subscriptions);
        }

        const updateWebviewContent = () => {
            if (editor && currentPanel) {
                const documentContent = editor.document.getText();
                
                // Determine whether to include Bootstrap and jQuery based on selected versions
                const includeBootstrap = bootstrapVersion !== 'None';
                const includeJquery = jqueryVersion !== 'None';
                
                // Only create CDN links if the libraries are included
                const bootstrapCssCdn = includeBootstrap ?
                    `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/css/bootstrap.min.css` : '';
                const bootstrapJsCdn = includeBootstrap ?
                    `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/js/bootstrap.min.js` : '';
                const jqueryJsCdn = includeJquery ?
                    `https://cdnjs.cloudflare.com/ajax/libs/jquery/${jqueryVersion}/jquery.min.js` : '';
                
                // Create HTML content with conditional includes
                const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Preview</title>
                    ${includeBootstrap ? `<link href="${bootstrapCssCdn}" rel="stylesheet">` : ''}
                </head>
                <body>
                <div class="${includeBootstrap ? 'container' : ''}">
                    ${documentContent}
                    ${includeJquery ? `<script src="${jqueryJsCdn}"></script>` : ''}
                    ${includeBootstrap ? `<script src="${bootstrapJsCdn}"></script>` : ''}
                </div>
                </body>
                </html>
                `;

                currentPanel.webview.html = htmlContent;
            }
        };

        updateWebviewContent();

        vscode.workspace.onDidChangeTextDocument(e => {
            if (editor && e.document === editor.document) {
                updateWebviewContent();
            }
        }, null, context.subscriptions);

        vscode.window.onDidChangeActiveTextEditor(activeEditor => {
            if (currentPanel && activeEditor && activeEditor.document === editor?.document) {
                editor = activeEditor;
                updateWebviewContent();
            }
        }, null, context.subscriptions);
    });

    context.subscriptions.push(disposable);
}
