---
sidebar_position: 2
sidebar_label: "CLI Types"
---
# Ascender Framework Integrated CLI Types

### Core CLIs

Core Integrated CLIs are CLIs that already defined, there are few of them:
1. **Server Management**
    - Made for managing a development server & building production server
    - Usage: `ascender run serve` or `ascender run build`

2. **Database Migrations**
    - Made for managing a database migrations.
    - Usage: `ascender run migrations -h`

3. **Controller Management**
    - Made for creating classical & identity (authentication) controllers
    - Usage: `ascender run ctrls -h`

### Custom CLIs

**Custom CLIs** in the Ascender Framework are command-line interface commands developed by external developers to extend the framework's functionality according to specific project needs. These commands are distinct from the built-in core and additional CLIs provided by the Ascender Framework. Custom CLIs allow developers to introduce new command functionalities tailored to their requirements.

There are two main types of custom CLIs you can create within the Ascender Framework:

1. **GenericCLI**: Allows for multiple command functions within a single class.
2. **BaseCLI**: Simplified CLI type with one command per class

If you considering to create your own CLI app in Ascender Framework, we recommend you to create `clis/` directory in your project root and proceed with next steps showed in the documentation