---
sidebar_position: 1
sidebar_label: "Initializing Database"
---
# Initializing Database

### Introduction

Ascender Framework has it's own integrated Database Engine and rules of how to use it effectively.

Currently Ascender Framework supports two types of database engines (ORMs):
1. **Tortoise ORM**
    - Tortoise ORM is robust and powerful asynchronous ORM and supports various popular database drivers like: SQLite, MySQL and PostgreSQL
2. **SQLAlchemy**
    - SQLAlchemy ORM is one of most popular and common ORM's used among various developers, though it doesn't support Active Record how it does Tortoise ORM it can be used easily and properply with `repositories` of controllers. Repositories primarily support SQLAlchemy because of it's design.


:::warning
At the start of the project, if you need to use database for more large and complicated project, be cautious and choose the ORM wisely, because then after making a project you can't change your option as you need to refactor a lots of code if you decide to change ORM at the half way.
:::

### Using Tortoise ORM

To initialize Ascender Framework's Database Engine with Tortoise ORM, you have to use method `app.use_database(...)` in the `Bootstrap.server_boot_up` with `orm` parameter set to TORTOISE in ORMEnum.

Here's how to do it:
```python
from core.application import Application
from core.database.types.orm_enum import ORMEnum
from core.database.engine import DatabaseEngine
from settings import DATABASE_CONNECTION

class Bootstrap:
    @staticmethod
    def server_boot_up(app: Application):
        app.use_database(lambda e: Bootstrap.database_registry(app, e),
                         orm=ORMEnum.TORTOISE,
                         configuration=DATABASE_CONNECTION)
    
    @staticmethod
    def database_registry(app: Application, engine: DatabaseEngine):
        ...
```

How you see we defined `orm` parameter of `app.use_database` method as `ORMEnum.TORTOISE` which sets Ascender Framework's Database Engine to run in TortoiseORM mode.

Additionally you have to define database initialization logic as first parameter asks you.

To do that, in the example we defined method called `Bootstrap.database_registry` which accepts `DatabaseEngine` as second parameter. In this method we define configuration and logic of initializing database how it's made here:

```python
from core.application import Application
from core.database.engine import DatabaseEngine

class Bootstrap:
    ...
    @staticmethod
    def database_registry(app: Application, engine: DatabaseEngine):
        engine.run_database()
```

As we use TortoiseORM, it's configuration dict is already contains all **configuration** we need to define, so this method is primarily made for **SQLAlchemy**. But that doesn't mean you don't have to define it, in the other case if you don't define this method and execute `engine.run_database()` then TortoiseORM won't get initialized.


### Using SQLAlchemy

To initialize Ascender Framework's Database Engine with SQLAlchemy ORM, you have to use method `app.use_database(...)` in the `Bootstrap.server_boot_up` with `orm` parameter set to SQLALCHEMY in ORMEnum.

Here's how to do it:
```python
from core.application import Application
from core.database.types.orm_enum import ORMEnum
from core.database.engine import DatabaseEngine
from settings import DATABASE_CONNECTION

class Bootstrap:
    @staticmethod
    def server_boot_up(app: Application):
        app.use_database(lambda e: Bootstrap.database_registry(app, e),
                         orm=ORMEnum.SQLALCHEMY,
                         configuration=DATABASE_CONNECTION)
    
    @staticmethod
    def database_registry(app: Application, engine: DatabaseEngine):
        ...
```

How you see we defined `orm` parameter of `app.use_database` method as `ORMEnum.SQLALchemy` which sets Ascender Framework's Database Engine to run in SQLAlchemy mode.

Additionally you have to define database initialization logic as first parameter asks you.

To do that, in the example we defined method called `Bootstrap.database_registry` which accepts `DatabaseEngine` as second parameter. In this method we define configuration and logic of initializing database how it's made here:

```python
from core.application import Application
from core.database.engine import DatabaseEngine

class Bootstrap:
    ...
    @staticmethod
    def database_registry(app: Application, engine: DatabaseEngine):
        engine.load_entities("entities.*")
        engine.run_database()
```

As we use SQLAlchemy, it's configuration dict is very restricted. So this method is primarily made for **SQLAlchemy**.