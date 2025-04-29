# Mitra React IDE

This is a Replit/StackBlitz-like code editor environment for Mitra React, allowing you to create, edit, and manage multiple files with support for imports between files.

## Features

- **File Management**: Create, edit, and delete files in a directory structure
- **Code Editing**: Full-featured code editor with syntax highlighting and error checking
- **Live Preview**: See your changes in real-time
- **Preview Mode**: Toggle between code editor and full-screen preview
- **Console Output**: View console logs and errors
- **Dependency Management**: Add and remove npm dependencies
- **Project Settings**: Configure your project name and settings
- **Export/Share**: Export your project as a JSON file or share it via a URL

## Getting Started

1. Access the IDE by navigating to `/ide-test.html` or by adding `?mode=ide` to the URL
2. The IDE will load with a default React project
3. Use the file explorer on the left to navigate between files
4. Create new files using the "New File" button
5. Edit files in the code editor
6. See the live preview in the "Preview" tab
7. View console output in the "Console" tab
8. Toggle between code editor and full-screen preview using the "Preview Mode" button
9. Manage project settings, dependencies, and sharing options using the toolbar buttons

## File Structure

The default project includes:

- `/index.html`: The HTML entry point (hidden)
- `/index.js`: The JavaScript entry point
- `/App.js`: The main React component
- `/styles.css`: CSS styles for the application
- `/components/Counter.js`: A sample React component
- `/package.json`: Project dependencies (hidden)

## Adding Dependencies

1. Click on the "Project Settings" button
2. In the dialog, scroll down to the "Dependencies" section
3. Enter the package name and version
4. Click "Add"
5. Click "Save Project" to apply the changes

## Sharing Your Project

1. Click on the "Share" button
2. A shareable link will be copied to your clipboard
3. Share this link with others to let them view and edit your project

## Exporting Your Project

1. Click on the "Export" button
2. A JSON file containing your project will be downloaded
3. You can import this file later to continue working on your project

## Technical Details

The IDE is built using:

- **@codesandbox/sandpack-react**: Provides the core code editing and preview functionality
- **@codesandbox/sandpack-themes**: Provides themes for the code editor
- **Shadcn UI**: Provides UI components for the interface
- **Local Storage**: Stores your project data locally in your browser

## Limitations

- The IDE currently runs entirely in the browser and does not have server-side functionality
- Dependencies are limited to what can be loaded via ESM imports
- Large projects may experience performance issues
- File uploads are not currently supported

## Future Enhancements

- Support for TypeScript
- Better dependency management
- File upload support
- Integration with version control systems
- Support for multiple projects
- Collaborative editing
