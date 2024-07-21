---
sidebar_position: 1
sidebar_label: "Creating an Application"
---

# Creating an Ascender Framework Application

### Bootstrap configuration

Every Application that runs on Ascender Framework starts by setting up `bootstrap.py`
Though after installation, `bootstrap.py` is already set up, but sometimes you have specific tasks where you should set `bootstrap.py` manually.

```py
from core.application import Application
from core.cli import CLI

class Bootstrap:

    @staticmethod
    def server_boot_up(app: Application):
        app.loader_module.register_controller({
            'name': "Ascender Framework API",
            'base_path': 'controllers',
            'exclude_controllers': [],
            'initialize_all_controllers': True,
        })
        app.loader_module.load_all_controllers()

    @staticmethod
    def cli_boot_up(app: Application, cli: CLI):
        pass
    
    @staticmethod
    def plugin_boot_up(app: Application):
        pass
```

***

### Bootstrap structure

The `bootstrap.py` has one static class called `Bootstrap` and contains several necessery static methods and optional methods.
```py
from core.application import Application
from core.cli import CLI

class Bootstrap:

    @staticmethod
    def server_boot_up(app: Application):
        ...

    @staticmethod
    def cli_boot_up(app: Application, cli: CLI):
        ...
    
    @staticmethod
    def plugin_boot_up(app: Application):
        ...
```

The structure of a classic application might look like this:
```
├── bootstrap.py
├── controllers
│   └── app
│       ├── endpoints.py
│       ├── service.py
│       └── repository.py
├── core
├── bootstrap.py
├── entities
└── start.py
```

***

### Handling Server Boot Up

The `Bootstrap.server_boot_up` method in bootstrap being called when Ascender Framework being launched as Running Server.

This method usually used to add controllers into active controllers registry, to initialize database driver, manage singletones and many other stuff related to Application.

```py
from core.application import Application
from core.cli import CLI

class Bootstrap:
    
    @staticmethod
    def server_boot_up(app: Application):
        ...
    
    ...
```
***

### Core Application

The core application in Ascender Framework is main and core component that initializes and manages the entire application. It is responsible for setting up the server, configuring middleware, initializing the database, and loading controllers.

See [Application API](/docs/api/application)

***

### Handling Plugin Boot Up

The `Bootstrap.plugin_boot_up` method in bootstrap being called when Ascender Framework being launched as Running Server and this method will be executed before `Bootstrap.server_boot_up` being called.

This method usually accepts application as an argument and is responsible for launching additional plugins and modules.

```py
from core.application import Application
from core.cli import CLI

class Bootstrap:
    ...

    @staticmethod
    def plugin_boot_up(app: Application):
        app.use_plugin(SomePlugin())
```

***

### Handling Cli Boot Up

The `Bootstrap.cli_boot_up` method in bootstrap being called when Ascender Framework being launched and will be executed before `Bootstrap.cli_boot_up` being called.

This method usually accepts cli (CLI registry) as an argument for adding cli to CLI Registry

```py
from core.application import Application
from core.cli import CLI

class Bootstrap:
    ...

    @staticmethod
    def cli_boot_up(app: Application, cli: CLI):
        cli.register_generic(SomeGenericCLI)
        cli.register_base("some_cli", SomeBasicCLI)
```