---
sidebar_position: 1
sidebar_label: "Overview"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Introduction to Identity Framework

### Ascender Framework Identity - Introduction

Ascender Framework Identity - Is built-in core authentication driver that allows to manage users, passwords, profile data, roles, claims, tokens, email confirmation, and more.

**IdentityRepository** is responsible for managing and storing: Passwords, profile data, users, email confirmations and many other.

**IdentityManager** is responsible for managing: Roles, claims, policies and tokens.

### Initialization

To initialize an Ascender Framework Identity you need to utilize `app.add_authorization` in `bootstrap.py`.

Before doing it you have to generate an auth controller with already ready **IdentityRepository**.
<Tabs>
    <TabItem value="withCLI" label="With Ascender CLI" default>
        ```bash
        $ ascender run ctrls identity --name auth
        ```
    </TabItem>
    <TabItem value="withoutCLI" label="Without Ascender CLI">
    ```bash
    $ python start.py ctrls identity --name auth
    ```
    </TabItem>
</Tabs>

Now you can proceed with Bootstrap class.

Here's how to do it:
```python

class Bootstrap:

    @staticmethod
    def server_boot_up(app: Application):
        app.use_database(lambda e: Bootstrap.database_registry(app, e),
                         ORMEnum.SQLALCHEMY, DATABASE_CONNECTION)
    
    @staticmethod
    def authorization_registry(security: Security):
        security.add_policy("isUser", lambda p: p.require_role("user"))

    @staticmethod
    def database_registry(app: Application, engine: DatabaseEngine):
        engine.load_entity("entities.user")
        engine.run_database()
        app.add_authorization(Bootstrap.authorization_registry,
                              identity_repository=AuthRepo(engine.generate_context()), 
                              auth_scheme="oauth2",
                              secret="asdwq231")
```

We recommend you to initialize identity engine authorization in method where you load database, especially after running a database. Because Ascender Framework Identity uses an **IdentityRepository** and invokes it's methods.

### Identity Repository

The Identity Repository is typically same repository as an ordinary Controller Repository but with a certain required methods. These methods usually are for authenticating, creating, deleting and getting a user. Identity Engine of Ascender Framework requires a controller made for authentication and has an Identity Repository.

So this means you can customize authentication in all ways you want.

When you generate an Identity controller via Ascender Framework Integrated CLI you will have an Identity Repository like this:

<Tabs>
    <TabItem value="SQLAlchemy" label="SQLAlchemy" default>
```python
from pydantic import EmailStr
from sqlalchemy import or_
from core.database.dbcontext import AppDBContext
from core.extensions.authentication.password_manager import AuthPassManager
from entities.user import UserEntity
from core.extensions.repositories import IdentityRepository, Repository


class AuthRepo(IdentityRepository):
    def __init__(self, _context: AppDBContext) -> None:
        self._context = _context
    
    async def create_user(self, username: str, email: EmailStr, password: str) -> UserEntity:
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
    
    async def get_user_by_login(self, login: str) -> UserEntity | None:
        query = await self._context.construct(UserEntity).filter(
            or_(UserEntity.username == login, UserEntity.email == login.lower()))
        result = query.first()
        return result[0] if result else None
    
    async def delete_user(self, user_id: int) -> None:
        async with self._context() as db:
            entity = await db.get(UserEntity, user_id)
            if not entity:
                return None
                
            await db.delete(entity)
```
    </TabItem>
    <TabItem value="TortoiseORM" label="TortoiseORM">
```python
from pydantic import EmailStr
from core.extensions.authentication.password_manager import AuthPassManager
from entities.user import UserEntity
from tortoise.expressions import Q
from core.extensions.repositories import IdentityRepository, Repository


class AuthRepo(IdentityRepository):
    
    async def create_user(self, username: str, email: EmailStr, password: str) -> UserEntity:
        entity = UserEntity(username=username, email=email.lower(), password=password)
        await db.save(entity)
        
        return entity

    async def update_user(self, user_id: int, **new_values) -> UserEntity | None:
        if not entity := await self.get_user(user_id=user_id):
            return None

        await entity.update_from_dict(new_values).save()

        return entity
    
    async def get_user(self, user_id: int) -> UserEntity | None:
        return await UserEntity.filter(Q(id=user_id)).first()
    
    async def get_user_by_login(self, login: str) -> UserEntity | None:
        return await UserEntity.filter(Q(username=login) | Q(email=login)).first()
    
    async def delete_user(self, user_id: int) -> None:
        if not entity := await self.get_user(user_id=user_id):
            return None
        
        await entity.delete()
```
    </TabItem>
</Tabs>

### Authorization Registry

Authorization Registry is responisble for defining: Roles, Policies or Custom handlers.

```python
class Bootstrap:
    ...

    @staticmethod
    def authorization_registry(security: Security):
        security.add_policy("isUser", lambda p: p.require_role("user"))
```

In this example we created a security policy `isUser` which requires `user` role.
Now we can use it in controller and check if user that makes request meets the requirements of this policy to access certain route.

To do that, you can wrap an endpoint method in `endpoints.py` of any controller with `@Authorize` decorator from `core.identity.decorators.authorize`
```python
...
from core.identity.decorators.authorize import Authorize

@Controller()
class App:
    
    @Post()
    @Authorize("isUser")
    async def protected_route(self):
        return "Access granted"
```
