"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const pdfProvider_1 = require("./pdfProvider");
function activate(context) {
    const extensionRoot = vscode.Uri.file(context.extensionPath);
    // Register our custom editor provider
    const provider = new pdfProvider_1.PdfCustomProvider(extensionRoot);
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('darkpdf.default.colorMode')) {
            provider.refreshAllPreviews();
        }
    }, null, context.subscriptions);
    context.subscriptions.push(vscode.window.registerCustomEditorProvider(pdfProvider_1.PdfCustomProvider.viewType, provider, {
        webviewOptions: {
            enableFindWidget: false,
            retainContextWhenHidden: true,
        },
    }));
    const toggle = vscode.commands.registerCommand('darkpdf.toggleDarkMode', () => {
        const config = vscode.workspace.getConfiguration('darkpdf');
        const currentMode = config.get('default.colorMode', true);
        return config.update('default.colorMode', !currentMode, vscode.ConfigurationTarget.Global);
    });
    context.subscriptions.push(toggle);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
