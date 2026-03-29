# PDF Dark Mode

`PDF Dark Mode` opens PDF files in a custom VS Code editor based on PDF.js and applies a dark reading mode by default. It is aimed at people who read PDFs in the editor for long stretches and want sane viewer defaults without leaving VS Code.

## Features

- Opens `*.pdf` files in a dedicated PDF preview editor.
- Applies an inverted dark mode by default.
- Lets you toggle dark mode with `Ctrl+Alt+D` on Windows/Linux and `Cmd+Alt+D` on macOS.
- Keeps configurable defaults for cursor tool, zoom, sidebar visibility, scroll mode, and spread mode.
- Reloads the preview when the underlying PDF file changes on disk.

## Extension Settings

This extension contributes the following settings:

- `darkpdf.default.colorMode`: Enable dark mode by default.
- `darkpdf.default.cursor`: Choose the initial cursor tool: `select` or `hand`.
- `darkpdf.default.scale`: Set the initial zoom level. Supports `auto`, `page-actual`, `page-fit`, `page-width`, or a numeric scale such as `1.25`.
- `darkpdf.default.sidebar`: Show or hide the left sidebar on load.
- `darkpdf.default.scrollMode`: Set the initial scroll mode: `vertical`, `horizontal`, or `wrapped`.
- `darkpdf.default.spreadMode`: Set the initial spread mode: `none`, `odd`, or `even`.

## Usage

1. Open any PDF file in VS Code.
2. If VS Code does not open it with this extension automatically, use `Reopen Editor With...` and select `PDF Preview`.
3. Toggle dark mode with the command `PDF Dark Mode: Toggle Dark Mode` or the keyboard shortcut.

## Known Limitations

- Dark mode is implemented by inverting the rendered PDF pages, so images and colored diagrams are inverted too.
- This extension is focused on reading and navigation, not on color-accurate rendering.

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md) for release history.
