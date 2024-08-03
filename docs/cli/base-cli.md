---
sidebar_position: 3
sidebar_label: "Base CLI"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Base CLI - Ascender Framework Integrated CLI

### Introduction

**BaseCLI** in the Ascender Framework is a simplified type of command-line interface (CLI) that allows you to define a single command per class. This is useful for straightforward CLI operations that do not require multiple subcommands.

**BaseCLI** is intended for simpler command-line tasks within the Ascender Framework. Each class inheriting from BaseCLI represents one command, making it easier to manage and implement basic CLI functionalities

### Implementation

There are no limitation in the file structure of CLIs so let's create our first and very simple CLI which will output `Hello world` text.

1. Create `clis/` directory in your project root if it doesn't exist
2. Create `example_cli.py` in the `clis/` directory of your project

```python
from core.cli import BaseCLI
from core.cli.application import ContextApplication
from core.cli.models import OptionCMD


class ExampleCLI(BaseCLI):
    # Define arguments here
    name: str = OptionCMD("-n", ctype=str, required=True)

    def callback(self, ctx: ContextApplication):
        ctx.console_print(f"[green]Hello world![/green] How are you doing `{self.name}`")
```
Alright, we succeed with creating basic CLI, but this isn't over yet, now we have to register it in CLI registry.

### Registering CLI

Navigate into `bootstrap.py` located in your project root directory. Find the `cli_boot_up` method.

```python
from core.application import Application
from core.cli.processor import CLI
from clis.example_cli import ExampleCLI


class Bootstrap:
    ...

    @staticmethod
    def cli_boot_up(app: Application, cli: CLI):
        cli.register_base("example", ExampleCLI)
```

Alright! Everything is setup, as we defined `example` as first argument now it will be available through this cli endpoint: `ascender run example`

Let's check it up!

<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run example --name John
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py example --name John
    ```
    </TabItem>
</Tabs>

```bash
>> Hello world! How are you doing John
```

### Context Application in CLI

The Context Application (`ctx`) in the Ascender Framework's CLI commands serves as a vital component for interacting with the command-line interface in a structured and enriched manner. It provides several built-in functionalities to streamline command execution and enhance the developer experience.

#### Purpose of Context Application

1. **Integration with Core Application**:
   - Allows access to the Core Application class.
   - Facilitates management of singletons within the framework.

2. **Enhanced Console Output**:
   - Enables outputting complex and stylized data to the console.
   - Supports tables, progress bars, colorful texts, prompts, and option selection.