---
sidebar_position: 3
sidebar_label: "Database Entities"
---
# Database Entities & Models

### What are entities

In the Ascender Framework, entities refer to the database models that represent the data structure within the application. These are defined within the `{project root}/entities` directory and are typically implemented using Tortoise ORM or SQLAlchemy.

There are some key points about entities:
1. **Purpose**
    - Entities define the schema of your database tables. They describe how data is stored, retrieved, and managed within the database.

2. **Location**
    - All database models (entities) should be placed inside the `{project root}/entities` directory. This is a convention that keeps the database-related code organized and separate from other application components.
3. **Ascender Framework Database Engine ORMs**
    - The framework uses Tortoise ORM or SQLAlchemy for interacting with the database. These ORMs are designed to provide asynchronous database interactions and are well-integrated with FastAPI which used under The Ascender Framework's hood.
4. **Difference from Pydantic Models**
    - Unlike Pydantic models, which are used for data validation (DTO & Responses) and serialization (typically defined as `Models` and `Serializers` optionals within controllers), entities are the actual database models. They define the structure and relationships of your database tables

### Example of an Entity

There are two [types of ORMs used in Ascender Framework](/docs/database/initializing):
1. [TortoiseORM](/docs/database/initializing#using-tortoise-orm)
2. [SQLAlchemy](/docs/database/initializing#using-sqlalchemy)

#### TortoiseORM Entity Example

To create TortoiseORM Entity, you have to set Ascender Framework's Database Engine to run in TortoiseORM mode and configure your project `bootstrap.py` to use [TortoiseORM](/docs/database/initializing#using-tortoise-orm).

Now if everything is done and your project is ready to work with TortoiseORM, let's proceed with defining Entities.

At the first steps, you have to: 
1. Create `entities/` directory in your project root.
2. Create entity file, in our example we will create user entity so let's name it `entities/user.py`

Alright! Now let's define the Entity structure:
```python
# entities/user.py
from tortoise.models import Model
from tortoise import fields

class UserEntity(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, unique=True)
    email = fields.CharField(max_length=255, unique=True)
    password = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    
    class Meta:
        table = "users"
```
:::warning
We recommend you to follow SOLID principles when it comes to define entities.
Don't place more then 1 entitiy per file!
:::

Now to include this entity into model loader in **TortoiseORM**, we need to define it in `settings.py`:
```python
# settings.py
DATABASE_CONNECTION = {
    "connections": {
        "default": {
            "engine": "tortoise.backends.sqlite",
            "credentials": {
                "file_path": "database.db"  # Replace with your SQLite database file path
            }
        }
    },
    "apps": {
        "models": {
            "models": ["entities.user", "aerich.models"],  # Added new entity here
            "default_connection": "default"
        }
    }
}
```
The full example of how to configure TortoiseORM configuration dict is in their official documentation or [here](/docs/database/configuration#setting-up-tortoise-orm)

#### SQLAlchemy Entity Example

To create SQLAlchemy Entity, you have to set Ascender Framework's Database Engine to run in SQLAlchemy mode and configure your project `bootstrap.py` to use [SQLAlchemy](/docs/database/initializing#using-sqlalchemy).

Now if everything is done and your project is ready to work with SQLAlchemy, let's proceed with defining Entities.

At the first steps, you have to: 
1. Create `entities/` directory in your project root.
2. Create entity file, in our example we will create user entity so let's name it `entities/user.py`

Alright! Now let's define the Entity structure:
```python
# entities/user.py
from core.database.entity import DBEntity
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime


class UserEntity(DBEntity):
    __tablename__ = "user"

    id: int = Column(Integer, primary_key=True)
    username: str = Column(String(60), index=True)
    email: str | None = Column(String(60), nullable=True)
    password: str = Column(Text)
    created_at: datetime = Column(DateTime, default=datetime.now())
    updated_at: datetime = Column(DateTime, default=datetime.now())
```
:::warning
We recommend you to follow SOLID principles when it comes to define entities.
Don't place more then 1 entitiy per file!
:::

The base entity class in SQLAlchemy should be imported from `core.database.entity` as `DBEntity` class.

Now to include this entity into entity loader in **Ascender Framework Database Engine**, we need to define it in `bootstrap.py`:
```python
# bootstrap.py
from core.application import Application
from core.database.types.orm_enum import ORMEnum
from settings import DATABASE_CONNECTION

class Bootstrap:
    @staticmethod
    def server_boot_up(app: Application):
        app.use_database(lambda e: Bootstrap.database_registry(app, e),
                         ORMEnum.SQLALCHEMY, DATABASE_CONNECTION)
    
    @staticmethod
    def database_registry(app: Application, engine: DatabaseEngine):
        engine.load_entity("entities.user", "core.migrations") # Added new entity here
        engine.run_database()
```
The full example of how to initialize SQLAlchemy and Ascender Framework Database Engine is [here](/docs/database/initializing) or read Ascender Framework Database Engine API Documentation
