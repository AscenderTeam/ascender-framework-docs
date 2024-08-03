---
sidebar_position: 5
sidebar_label: "Asynchronous Module"
---
# Executing CLI Callback Asynchronously

### Asynchronous In CLIs

If you have a specific tasks in CLI that require asynchronous code executing then you can do it easily by wrapping CLI callback method with `@CoroCLI()` decorator imported from `core.cli.async_module`.

### Using CoroCLI In BaseCLI

To use make a BaseCLI asynchronous you can just add `@CoroCLI()` decorator over it's callback method like so:
```python
from core.cli.async_module import CoroCLI
from core.cli.main import BaseCLI
from core.cli.application import ContextApplication

class ExampleCLI(BaseCLI):
    arg1: str
    arg2: int

    @CoroCLI()
    async def callback(self, ctx: ContextApplication):
        result = await asynchronous_method_example()
        ctx.console_print(result)

```

### Using CoroCLI In GenericCLI

To use make a GenericCLI asynchronous you should also add `@CoroCLI()` decorator over it's callback methods for commands like so:

```python
from core.cli.async_module import CoroCLI
from core.cli.main import GenericCLI, console_command
from core.cli.application import ContextApplication

class ExampleCLI(GenericCLI):

    @console_command(name="example-one")
    @CoroCLI()
    async def example_one(self, ctx: ContextApplication):
        result = await asynchronous_method_example()
        ctx.console_print(result)
    
    @console_command(name="example-two")
    @CoroCLI()
    async def example_two(self, ctx: ContextApplication):
        result = await asynchronous_method_example2()
        ctx.console_print(result)
```

### Using CoroCLI in ORM mode

If you want to async module for database operations you have to set `@CoroCLI()` decorator's `is_orm` parameter to `True`.

By default it's set to `False`.

```python
from core.cli.async_module import CoroCLI
from core.cli.main import GenericCLI, console_command
from core.cli.application import ContextApplication
from .repository import ExampleCLIRepository

class ExampleCLI(GenericCLI):

    @console_command(name="example-one")
    @CoroCLI(is_orm=True)
    async def example_one(self, ctx: ContextApplication):
        self._application.use_database(lambda e: e.run_database(),
                         orm=ORMEnum.TORTOISE,
                         configuration=DATABASE_CONNECTION) # Manual database initialization
        
        repository = ctx.load_repository(ExampleCLIRepository)
        result = await repository.get_all()
        ctx.console_print(result)
```

If you will set `is_orm=True` then the database initialization and connection termination will be smooth and errorless.