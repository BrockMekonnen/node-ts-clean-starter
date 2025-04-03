# Clean Node TS API

This is a Node.js API template built with Clean Architecture using TypeScript. It follows a modular structure for scalability and maintainability.

## Features
- **Modular Clean Architecture**: Organized into distinct modules for separation of concerns.
- **Awilix for Dependency Injection**: Enables better testability and flexibility.
- **MongoDB Database**: Used for data storage.
- **Pino & Pino-HTTP for Logging**: Provides high-performance logging.

## Folder Structure
```
src/
│   ├── _boot       # Main components for bootstrapping the application
│   ├── _lib        # Core libraries and utilities
│   ├── _shared     # Shared components used across different modules
│   ├── auth        # Authentication module
│   ├── user        # User module
```

## Modules
- **Authentication**: Handles user authentication.
- **User Management**: Manages user creation and operations.

## Getting Started
To run the application, follow these steps:

```sh
# Install dependencies
npm install

# Start the application
npm run dev

# To build the application
npm run build
```



This starter provides a solid foundation for building scalable and maintainable Node.js APIs with TypeScript.

