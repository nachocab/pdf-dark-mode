"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
const packageJson = require("../../../package.json");
suite('Extension Test Suite', () => {
    test('registers the dark mode toggle command', async () => {
        const extensionId = `${packageJson.publisher}.${packageJson.name}`;
        const extension = vscode.extensions.getExtension(extensionId);
        assert.ok(extension, `Expected extension ${extensionId} to be available`);
        await extension.activate();
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('darkpdf.toggleDarkMode'));
    });
});
