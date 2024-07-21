---
sidebar_position: 4
sidebar_label: "Using in controller"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Database In Controllers

### Repositories

Repositories are a key feature in the Ascender Framework for working with data, especially for fetching data. The usage of repositories varies depending on the ORM you use in your Ascender Framework project.

1. **Tortoise ORM**
    - In project initialized with [Tortoise ORM](/docs/database/initializing#using-tortoise-orm), repositories are primarily used for fetching data rather than CRUD operations. This is because TortoiseORM has an Active Record feature, which allows you to perform database operations with a single line of code. The purpose of repositories is to simplify database queries. However, with TortoiseORM's Active Record feature, using repositories for each query can make the process less efficient

2. **SQLAlchemy**
    - In project initialized with [SQLAlchemy](/docs/database/initializing#using-sqlalchemy), repositories are used in different way then in case with TortoiseORM. This is because SQLAlchemy uses database context which allows you to preform database operations. This approach is more complex and leverages Python's context manager, making it suitable for any type of database operations inside the repositories.
    - Repositories also will accept a `_context` argument in `__init__` function which will be the database context, allowing the creation of database transaction sessions.

### Using Controller Repositories

Each controller must have a one repository. It is necessery component of an Ascender Framework controller, even if Ascender Framework's Database Engine wasn't initialized, you must define a repository. Each time when you will generate a controller, they all will be generated with a `repository.py` file.

How it was said earlier, the usage of repositories varies depending on the ORM you use in your Ascender Framework project. So let's dive deeper and define our first repository.

### SQLAlchemy

Consider we have a controller called `user` that allows us to manage user via REST API.
Now we want to handle user data. In earlier [example](/docs/database/entities#sqlalchemy-entity-example) we created `UserEntity` which we are going to use now in our repository.

Now let's create a controller called `user`

<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run ctrls new --name user
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py ctrls new --name user
    ```
    </TabItem>
</Tabs>



```bash
>> Creating new controller with name: users...

Warning! Avoid passing the controller name with spaces and follow casing types!
Created file: controllers/user/endpoints.py
Created file: controllers/user/service.py
Created file: controllers/user/repository.py
Done! You can check it up in: controllers/users
```

Now let's modify our `controllers/users/repository.py`.

Right now it might look like this:
```python
from core.database.dbcontext import AppDBContext
from core.extensions.repositories import Repository


class UserRepo(Repository):
    def __init__(self, _context: AppDBContext | None = None) -> None:
        super().__init__(_context)
```

Let's add some of CRUD methods to our repository

```python
from core.database.dbcontext import AppDBContext
from core.extensions.repositories import Repository
from entities.user import UserEntity


class UserRepo(Repository):
    def __init__(self, _context: AppDBContext | None = None) -> None:
        super().__init__(_context)
    
    async def create_user(self username: str, email: EmailStr, password: str) -> UserEntity:
        async with self._context() as db:
            entity = UserEntity(username=username, email=email.lower(), password=password)
            db.add(entity)
            await db.commit()
            await db.refresh(entity)
        
        return entity

    async def update_user(self, user_id: int, **new_values) -> UserEntity | None:
        async with self._context() as db:
            entity = await db.get(UserEntity, user_id)
            
            if not entity:
                return None
            
            for key, value in new_values.items():
                setattr(entity, key, value)

        return entity
    
    async def get_user(self, user_id: int) -> UserEntity | None:
        query = await self._context.construct(UserEntity).filter(UserEntity.id == user_id)

        result = query.first()
        return result[0] if result else None
    
    async def delete_user(self, user_id: int) -> UserEntity | None:
        async with self._context() as db:
            entity = await db.get(UserEntity, user_id)
            if not entity:
                return None
            
            await db.delete(entity)
```

Very well, we successfully created base repository, though it's already have built in CRUD methods for SQLAlchemy and you can use them by defining `self.main_entity`.

Now you can invoke and execute these methods in service or anywhere.
Let's try using it in service of a controller, we will use DTO and Response models that we used in previous [examples](/docs/essentials/optionals#models-dtos--responses)
```python
from .models import UserResponse, UserDTO
from core.extensions.services import Service
from controllers.users.repository import UserRepo
from fastapi import HTTPException

class UserService(Service):

    def __init__(self, repository: UserRepo):
        self._repository = repository
    
    async def create_user(self, data: UserDTO):
        user = await self._repository.create_user(**data.model_dump())

        return UserResponse.model_validate(user)
    
    async def get_user(self, user_id: int):
        if not user := await self._repository.get_user(user_id):
            raise HTTPException(404, "User not found")
        
        return UserResponse.model_validate(user)
```

Here we created two methods, for creating user and for getting a user. Now let's finally define endpoints.

```python
from controllers.user.repository import UserRepo
from controllers.user.service import UserService
from core.types import ControllerModule
from core.utils.controller import Controller, Get, Post # Using Controller, Get and Post decorators
from controllers.user.models import UserDTO # Using UserDTO


@Controller()
class User:
    def __init__(self, user_service: UserService) -> None:
        self.user_service = user_service

    @Get("{user_id}")
    async def get_user_endpoint(self, user_id: int):
        return await self.user_service.get_user(user_id)
    
    @Post()
    async def create_user_endpoint(self, dto: UserDTO):
        return await self.user_service.create_user(dto)


def setup() -> ControllerModule:
    return {
        "controller": User,
        "services": {
            "user": UserService
        },
        "repository": UserRepo,
        "plugin_configs": {}
    }
```

Alright, now if everything is setup properly, we can check it by running a development server. Here's how to do it:
<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run serve
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py serve
    ```
    </TabItem>
</Tabs>

```bash
>> Starting a development server... 
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [50000] using WatchFiles
WARNING:  ASGI app factory detected. Using it, but please consider setting the --factory flag explicitly.
INFO:     Started server process [50005]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

If you see this, you made it success!

As an Ascender Framework uses **FastAPI** under it's hood, you can use SwaggerUI or Redoc:
1. **SwaggerUI** 
    - https://127.0.0.1:8000/docs
2. **Redoc**
    - https://127.0.0.1:8000/redoc


### TortoiseORM

Now let's makes something same but with **TortoiseORM** as main ORM in Ascender Framework Database Engine. In earlier [example](/docs/database/entities#tortoiseorm-entity-example) we created `UserEntity` for **TortoiseORM** which we are going to use now in our repository.

Now let's create a controller called `user`

<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run ctrls new --name user
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py ctrls new --name user
    ```
    </TabItem>
</Tabs>



```bash
>> Creating new controller with name: users...

Warning! Avoid passing the controller name with spaces and follow casing types!
Created file: controllers/user/endpoints.py
Created file: controllers/user/service.py
Created file: controllers/user/repository.py
Done! You can check it up in: controllers/users
```

Now let's modify our `controllers/users/repository.py`.

Right now it might look like this:
```python
from core.database.dbcontext import AppDBContext
from core.extensions.repositories import Repository


class UserRepo(Repository):
    def __init__(self, _context: AppDBContext | None = None) -> None:
        super().__init__(_context)
```

Let's add some of fetching methods to our repository

```python
from core.database.dbcontext import AppDBContext
from core.extensions.repositories import Repository
from entities.user import UserEntity


class UserRepo(Repository):
    def __init__(self, _context: AppDBContext | None = None) -> None:
        super().__init__(_context) # _context parameter will be None when you use TortoiseORM
    
    async def get_user(self, **filter) -> UserEntity | None:
        query = await UserEntity.filter(**filter).first()

        return query
```

Very well, we successfully created base repository, even if it isn't that complex and large, sometimes you may have complicated and large unreadable queries and Repositories are useful components in that cases.

Now you can invoke and execute this method in service or anywhere.
Let's try using it in service of a controller, we will use DTO and Response models that we used in previous [examples](/docs/essentials/optionals#models-dtos--responses)
```python
from .models import UserResponse, UserDTO
from core.extensions.services import Service
from controllers.users.repository import UserRepo
from fastapi import HTTPException
from entities.user import UserEntity

class UserService(Service):

    def __init__(self, repository: UserRepo):
        self._repository = repository
    
    async def create_user(self, data: UserDTO):
        user = UserEntity(**data.model_dump())
        await user.save()

        return UserResponse.model_validate(user)
    
    async def get_user(self, user_id: int):
        if not user := await self._repository.get_user(id=user_id):
            raise HTTPException(404, "User not found")
        
        return UserResponse.model_validate(user)
```

Here we created two methods, for creating user and for getting a user. Now let's finally define endpoints.

```python
from controllers.user.repository import UserRepo
from controllers.user.service import UserService
from core.types import ControllerModule
from core.utils.controller import Controller, Get, Post # Using Controller, Get and Post decorators
from controllers.user.models import UserDTO # Using UserDTO


@Controller()
class User:
    def __init__(self, user_service: UserService) -> None:
        self.user_service = user_service

    @Get("{user_id}")
    async def get_user_endpoint(self, user_id: int):
        return await self.user_service.get_user(user_id)
    
    @Post()
    async def create_user_endpoint(self, dto: UserDTO):
        return await self.user_service.create_user(dto)


def setup() -> ControllerModule:
    return {
        "controller": User,
        "services": {
            "user": UserService
        },
        "repository": UserRepo,
        "plugin_configs": {}
    }
```

Alright, now if everything is setup properly, we can check it by running a development server. Here's how to do it:
<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run serve
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py serve
    ```
    </TabItem>
</Tabs>

```bash
>> Starting a development server... 
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [50000] using WatchFiles
WARNING:  ASGI app factory detected. Using it, but please consider setting the --factory flag explicitly.
INFO:     Started server process [50005]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

If you see this, you made it success!

As an Ascender Framework uses **FastAPI** under it's hood, you can use SwaggerUI or Redoc:
1. **SwaggerUI** 
    - https://127.0.0.1:8000/docs
2. **Redoc**
    - https://127.0.0.1:8000/redoc