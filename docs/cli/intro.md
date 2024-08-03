---
sidebar_position: 1
sidebar_label: "Introduction"
---
# Introduction into Integrated CLI

### What is an Integrated CLI - Basics

Integrated CLI - Is one of powerful tool that Ascender Framework has, this tool allows the framework to create beautiful and easy to use CLI apps.

Also it allows developers to create their own customized CLI app.

### Differences between Integrated CLI and Ascender CLI

#### Integrated CLI

The Integrated CLI is part of the Ascender Framework and is designed to be executed within the context of your project. To run the Integrated CLI, you use the `start.py` file located in your project's root directory.

**Execution:**
```bash
$ python start.py <command>
```

**Key Points:**
- **Scope**: Project-specific. Cannot be executed outside the project environment.
- **Environment**: Requires manual activation of the project's virtual environment (`.asc_venv`).

#### Ascender CLI

The Ascender CLI is a global command-line interface provided as a PyPI package. It facilitates project management tasks such as creating, updating, and installing dependencies.

**Installation:**
```bash
$ pip install ascender
```

**Execution:**
```bash
$ ascender <command>
```

**Key Points:**
- **Scope**: Global. Can manage multiple projects.
- **Integration**: Can execute Integrated CLI commands within the project environment.
- **Environment**: Automatically activates the project's virtual environment (`.asc_venv`) when running Integrated CLI commands.

**Executing Integrated CLI through Ascender CLI:**
```bash
$ ascender run <command>
```

### Summary

- **Integrated CLI**: Project-specific, requires manual virtual environment activation.
- **Ascender CLI**: Global, automates virtual environment management, and facilitates project-wide tasks.

By using the Ascender CLI, you can streamline your workflow, ensuring that all commands are executed within the appropriate virtual environment without manual intervention.
