---
sidebar_position: 2
sidebar_label: "Configurating Database"
---
# Configurating Database Engine

### Setting up Tortoise ORM

Currently Tortoise ORM supports various database drivers:
- SQLite (requires `aiosqlite`)
- PostgreSQL (requires `asyncpg`)
- MySQL (requires `asyncmy`)
- Microsoft SQL Server/Oracle (requires `asyncodbc`)

In this tutorial we will configure all of them for giving useful example.

#### SQLite

To initialize Ascender Framework Database Engine with Tortoise ORM running on **SQLite** database we have to setup `DATABASE_CONNECTION` constant in `settings.py` of our Ascender Framework Project. 

Here's how to do it:
```python
# settings.py
...
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
            "models": ["aerich.models"],  # Replace with the path to your models module
            "default_connection": "default"
        }
    }
}
```
How you see, Tortoise ORM supports multiple database connections which someone can find useful. But in this example we setup `DATABASE_CONNECTION` to work with only one `default` connection that uses SQLite as database driver.

Lower in `apps` parameter, you can see definition of `apps` which are database entities (models) tied to connection.

#### MySQL

To initialize Ascender Framework Database Engine with Tortoise ORM running on **MySQL** database we have to setup `DATABASE_CONNECTION` constant in `settings.py` of our Ascender Framework Project. 

Here's how to do it:
```python
# settings.py
...
DATABASE_CONNECTION = {
    "connections": {
        "default": {
            "engine": "tortoise.backends.mysql",
            "credentials": {
                "user": "mysql_user",  # Replace with your MySQL user
                "password": "mysql_password", # Replace with your MySQL user password
                "database": "mysql_database", # Replace with your MySQL database name
                "host": "localhost", # Replace with your MySQL server host
                "port": 3306, # Replace with your MySQL server port
            }
        }
    },
    "apps": {
        "models": {
            "models": ["aerich.models"],  # Replace with the path to your models module
            "default_connection": "default"
        }
    }
}
```
The differences from SQLite is that MySQL's `credentials` parameter it differs from what was used in SQLite

#### PostgreSQL

To initialize Ascender Framework Database Engine with Tortoise ORM running on **PostgreSQL** database we have to setup `DATABASE_CONNECTION` constant in `settings.py` of our Ascender Framework Project. 

Here's how to do it:
```python
# settings.py
...
DATABASE_CONNECTION = {
    "connections": {
        "default": {
            "engine": "tortoise.backends.psycopg",
            "credentials": {
                "user": "postgresql_user",  # Replace with your PostgreSQL user
                "password": "postgresql_password", # Replace with your PostgreSQL user password
                "database": "postgresql_database", # Replace with your PostgreSQL database name
                "host": "localhost", # Replace with your PostgreSQL server host
                "port": 3306, # Replace with your PostgreSQL server port
            }
        }
    },
    "apps": {
        "models": {
            "models": ["aerich.models"],  # Replace with the path to your models module
            "default_connection": "default"
        }
    }
}
```
To use PostgreSQL, we changed `connections.default.engine` parameter into `tortoise.backends.psycopg`

### Setting up SQLAlchemy

As same as Tortoise ORM supports various database drivers, SQLAlchemy supports some too:
- SQLite (requires `aiosqlite`)
- PostgreSQL (requires `asyncpg`)
- MySQL (requires `asyncmy`)

In this tutorial we will configure all of them for giving useful example.

#### SQLite

To initialize Ascender Framework Database Engine with SQLAlchemy running on **SQLite** database we have to setup `DATABASE_CONNECTION` constant in `settings.py` of our Ascender Framework Project. 

Here's how to do it:
```python
# settings.py
...
DATABASE_CONNECTION = {
    "type": "dbstring",
    "content": "sqlite+aiosqlite:///file_path" # Replace file_path with your own database file
}
```
SQLAlchemy's `DATABASE_CONNECTION` configuration is quite simple and short compared to the one with Tortoise ORM.

If you don't like using database URI-like connection strings then there is another solution for you:
```python
# settings.py
...
DATABASE_CONNECTION = {
    "type": "manual",
    "content": {
        "engine": "sqlite+aiosqlite",
        "credentials": {
            "file_path": "file_path" # Replace file_path with your own database file
        }
    }
}
```
In this one, connection configuration is close similar to TortoiseORM one. But we don't manage multiple connections here.

#### MySQL

To initialize Ascender Framework Database Engine with SQLAlchemy running on **MySQL** database we have to setup `DATABASE_CONNECTION` constant in `settings.py` of our Ascender Framework Project. 

Here's how to do it:
```python
# settings.py
...
DATABASE_CONNECTION = {
    "type": "dbstring",
    "content": "mysql+asyncmy:///username:password@localhost:3306/database" # Replace fields with your own database credentials
}
```

And here's configuration with type set to `manual`
```python
# settings.py
...
DATABASE_CONNECTION = {
    "type": "manual",
    "content": {
        "engine": "mysql+asyncmy",
        "credentials": {
            "user": "mysql_username", # Replace with your MySQL user
            "password": "mysql_password", # Replace with your MySQL user password
            "database": "mysql_database", # Replace with your MySQL database name
            "host": "localhost", # Replace with your MySQL server host
            "port": 3306 # Replace with your MySQL server port
        }
    }
}
```


#### PostgreSQL

To initialize Ascender Framework Database Engine with SQLAlchemy running on **PostgreSQL** database we have to setup `DATABASE_CONNECTION` constant in `settings.py` of our Ascender Framework Project. 

Here's how to do it:
```python
# settings.py
...
DATABASE_CONNECTION = {
    "type": "dbstring",
    "content": "postgresql+asyncpg:///username:password@localhost:5432/database" # Replace fields with your own database credentials
}
```

And here's configuration with type set to `manual`
```python
# settings.py
...
DATABASE_CONNECTION = {
    "type": "manual",
    "content": {
        "engine": "postgresql+asyncpg",
        "credentials": {
            "user": "postgresql_username", # Replace with your MySQL user
            "password": "postgresql_password", # Replace with your MySQL user password
            "database": "postgresql_database", # Replace with your MySQL database name
            "host": "localhost", # Replace with your MySQL server host
            "port": 5432 # Replace with your MySQL server port
        }
    }
}
```