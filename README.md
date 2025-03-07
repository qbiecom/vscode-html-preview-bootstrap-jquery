# HTML Preview with Bootstrap and jQuery

## Features

Preview HTML snippets with Bootstrap and jQuery directly in VS Code. This extension provides a live preview of your HTML content with your selected versions of Bootstrap and jQuery included.

I use this for helping me write Knowledge Base articles in ServiceNow using [SNUtils and SN-Scriptsync](https://www.arnoudkooi.com) but I'm sure there are many other use cases!

Choose from a wide range of versions:
* Bootstrap: 'None' or versions 3.1.1 through 5.3.3
* jQuery: 'None' or versions 1.5.1 through 3.7.1

You can select 'None' for either Bootstrap or jQuery if you don't want to include that library in your preview. This is useful if you want to preview HTML with only one of the libraries or if you want to use other frameworks in the future.

## Instructions

There are two ways to open the preview:

1. With an HTML file open, click the preview icon in the editor title bar (appears in the top-right corner when viewing HTML files).
2. With an HTML file open, open the command palette (Ctrl+Shift+P or Cmd+Shift+P) and search for "HTML Preview with Bootstrap and jQuery".

## Configuration

You can customize which versions of Bootstrap and jQuery are used in the preview:

1. Open VS Code Settings (File > Preferences > Settings or Ctrl+,)
2. Search for "HTML Preview with Bootstrap and jQuery"
3. Select your preferred versions from the dropdown menus

Default versions:
* Bootstrap: 3.4.1
* jQuery: 2.2.4

Note: If you change the versions of Bootstrap or jQuery in the extension settings, close and reopen the preview for the changes to take effect.

## Release Notes

See the [changelog](CHANGELOG.md).

**Enjoy!**
