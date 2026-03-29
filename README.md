# PDF Dark Mode

`PDF Dark Mode` opens PDF files in a custom VS Code editor based on PDF.js and applies a dark reading mode by default.

This extension is based on [PotatoZhou/darkpdf](https://github.com/PotatoZhou/darkpdf).

## Features

- Applies an inverted dark mode by default.
- Defaults to `page-width` zoom on load.
- Uses a toolbar checkbox for dark mode, plus a VS Code command and keyboard shortcut.
- `ignoreDestinationZoom` is enabled, which prevents zoom jumps when you click PDF bookmarks or internal links.
- The print shortcut is removed, so `Cmd+P` stays available for VS Code's own `Go to File` command.
- The default view when opening the sidebar is the Document Outline (if available) instead of the thumbnails.

## Extension Settings

This extension contributes the following settings:

- `pdfDarkMode.default.colorMode`: Enable dark mode by default.
- `pdfDarkMode.default.cursor`: Choose the initial cursor tool: `select` or `hand`.
- `pdfDarkMode.default.scale`: Set the initial zoom level. Supports `auto`, `page-actual`, `page-fit`, `page-width`, or a numeric scale such as `1.25`.
- `pdfDarkMode.default.sidebar`: Show or hide the left sidebar on load.
- `pdfDarkMode.default.sidebarView`: Choose the default sidebar tab: `thumbnails` or `outline`.
- `pdfDarkMode.default.scrollMode`: Set the initial scroll mode: `vertical`, `horizontal`, or `wrapped`.
- `pdfDarkMode.default.spreadMode`: Set the initial spread mode: `none`, `odd`, or `even`.

To change these settings:

1. Open VS Code Settings.
2. Search for `pdf dark mode` or `pdfDarkMode`.
3. Change the values in the Settings UI, or edit them directly in `settings.json`.

## Usage

1. Open any PDF file in VS Code.
2. If VS Code does not open it with this extension automatically, use `Reopen Editor With...` and select `PDF Preview`.
3. Toggle dark mode with the toolbar checkbox, or run `PDF Dark Mode: Toggle Dark Mode` from the Command Palette.
4. Use the `pdfDarkMode.default.*` settings to choose your preferred default zoom, sidebar, cursor, scroll, and spread behavior.

## Keyboard Shortcut

The extension contributes a default shortcut for `PDF Dark Mode: Toggle Dark Mode`:

- Windows/Linux: `Ctrl+Alt+D`
- macOS: `Cmd+Alt+D`

You can change it in VS Code:

1. Open `Keyboard Shortcuts`.
2. Search for `PDF Dark Mode: Toggle Dark Mode`.
3. Assign the shortcut you want.

If you prefer editing JSON directly, remap the `pdfDarkMode.toggleDarkMode` command in `keybindings.json`.

## Known Limitations

- Dark mode is implemented by inverting the rendered PDF pages, so images and colored diagrams are inverted too.
- This extension is focused on reading and navigation, not on color-accurate rendering.

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md) for release history.
