---
sidebar_position: 4
sidebar_label: "Generic CLI"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Generic CLI - Ascender Framework Integrated CLI

### Introduction

**GenericCLI** in the Ascender Framework is an advanced type of command-line interface (CLI) that allows you to define multiple commands within a single class. This is useful for more complex CLI operations that require multiple subcommands and greater flexibility.

**GenericCLI** is intended for more sophisticated command-line tasks within the Ascender Framework. Each class inheriting from GenericCLI can represent multiple commands, making it easier to manage and implement a comprehensive set of CLI functionalities.

### Implementation

There are no limitations in the file structure of CLIs, so let's create our first and very simple GenericCLI, which will output `Hello world` text in different formats.

1. Create the `clis/` directory in your project root if it doesn't exist.
2. Create `hello_cli.py` in the `clis/` directory of your project.

```python
from core.cli import GenericCLI
from core.cli.main import console_command
from core.cli.application import ContextApplication
from core.cli.models import OptionCMD

class HelloCLI(GenericCLI):

    @console_command(name="hello-world")
    def hello_world(self, ctx: ContextApplication):
        ctx.console_print("[bold green]Hello world![/bold green] YAY the CLI works!")
        
    @console_command()
    def greet(self, ctx: ContextApplication, name: str = OptionCMD("-n", ctype=str, required=True)):
        ctx.console_print(f"[bold blue]Hello, {name}![/bold blue] This is the greet command.")
```

Alright, we succeeded with creating a basic GenericCLI, but this isn't over yet. Now we have to register it in the CLI registry.

### Registering CLI

Navigate to `bootstrap.py` located in your project root directory. Find the `cli_boot_up` method.

```python
from core.application import Application
from core.cli.processor import CLI
from clis.hello_cli import HelloCLI

class Bootstrap:
    ...

    @staticmethod
    def cli_boot_up(app: Application, cli: CLI):
        cli.register_generic(HelloCLI)
```

Alright! Everything is set up. Now the commands will be available through this CLI endpoint: `ascender run hello-world` and `ascender run greet --name John`.

Let's check it up!

<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run hello-world
        $ ascender run greet --name John
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py hello-world
    $ python start.py greet --name John
    ```
    </TabItem>
</Tabs>

```bash
>> Hello world! YAY the CLI works!
>> Hello, John! This is the greet command.
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

### Example of Enhanced Console Output

Here’s an example demonstrating the enhanced console output capabilities of the Context Application:

```python
from core.cli import GenericCLI
from core.cli.main import console_command
from core.cli.application import ContextApplication
from rich.table import Table # Uses Rich Console under hood

class EnhancedCLI(GenericCLI):

    @console_command(name="display-table")
    def display_table(self, ctx: ContextApplication):
        table = Table(title="Sample Table")
        table.add_column("Column 1", justify="right", style="cyan", no_wrap=True)
        table.add_column("Column 2", style="magenta")
        table.add_column("Column 3", justify="right", style="green")
        table.add_row("Row 1", "Row 2", "Row 3")
        ctx.console_print(table=table)

    @console_command(name="show-progress")
    def show_progress(self, ctx: ContextApplication):
        from rich.progress import Progress # Uses Rich Console under hood

        with Progress() as progress:
            task = progress.add_task("[green]Processing...", total=100)
            while not progress.finished:
                progress.update(task, advance=0.5)
```

### Registering Enhanced CLI

As with the previous examples, register the new CLI commands in `bootstrap.py`:

```python
from core.application import Application
from core.cli.processor import CLI
from clis.enhanced_cli import EnhancedCLI

class Bootstrap:
    ...

    @staticmethod
    def cli_boot_up(app: Application, cli: CLI):
        cli.register_generic(EnhancedCLI)
```

Now, you can run the new commands as follows:

<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run display-table
        $ ascender run show-progress
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py display-table
    $ python start.py show-progress
    ```
    </TabItem>
</Tabs>