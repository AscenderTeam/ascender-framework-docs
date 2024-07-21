---
sidebar_position: 2
sidebar_label: "Quickstart"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ascender Framework Quickstart Guide

This quickstart guide will help you get up and running with the Ascender Framework in just a few steps. Follow these instructions to set up your project, configure your environment, and create your first controller.

## Step 1: Install Ascender CLI Helper
The Ascender CLI Helper simplifies project creation and management.

**Install the CLI Helper:**
<Tabs>
    <TabItem value="windows" label="Windows" default>
        ```bash
        pip install ascender
        ```
    </TabItem>
    <TabItem value="macos" label="MacOS/Linux">
    ```bash
    pip3 install ascender
    ```
    </TabItem>
</Tabs>

## Step 2: Create a New Project
Use the Ascender CLI to create a new project. This will set up the project structure and necessary configurations.

**Create a New Project:**
```bash
ascender projects new --name <project-name>
```

This command will:
- Pull the AscenderFramework from the repository.
- Create a virtual environment.
- Install required packages.

## Step 3: Configure the Project
Modify `bootstrap.py` for server settings and controller registration.

**Example `bootstrap.py`:**
```python
from core.application import Application
from core.cli.main import CLI

class Bootstrap:

    @staticmethod
    def server_boot_up(app: Application):
        app.use_database()
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
```

## Step 4: Run the Application
Start the server to begin development.

**Start the Server:**
```bash
ascender run serve
```
or if you haven't installed the Ascender CLI Helper, use:
```bash
python3 start.py serve
```

## Step 5: Create Your First Controller
Generate a new controller using the Ascender CLI. This will create the necessary files in the `controllers/` directory.

**Create a New Controller:**
```bash
ascender run ctrls new --name <controller-name>
```

This will create a controller with the following structure:
```
controllers/
└── <controller-name>/
    ├── endpoints.py
    ├── service.py
    └── repository.py
```

## Step 6: Define Endpoints, Services, and Repositories

**Example `endpoints.py`:**
```python
from core.utils.controller import Controller, Get

@Controller()
class TestController:
    def __init__(self, test_service: TestService):
        self.test_service = test_service

    @Get()
    async def hello_endpoint(self):
        return self.test_service.get_hello()
```

**Example `service.py`:**
```python
from core.extensions.services import Service

class TestService(Service):
    def __init__(self, repository: TestRepo):
        self.repository = repository

    async def get_hello(self):
        return "Hello world"
```

**Example `repository.py`:**
```python
from core.extensions.repository import Repository
from core.database.dbcontext import AppDBContext

class TestRepo(Repository):
    def __init__(self, _context: AppDBContext | None):
        self._context = _context
    # Add methods to fetch data
```

## Step 7: Initialize the Database
Set up the database schema and initialize the database.

**Initialize the Database:**
```bash
ascender run migration init
```

To create a new migration:
```bash
ascender run migration migrate --name <migration_name>
```

## Optional: Define Pydantic Models
Define your data validation and response models using Pydantic in `models/` dir.

**Example `models/dtos/user.py`:**
```python
from core.optionals import BaseDTO

class UserDTO(BaseDTO):
    name: str
    email: str
```

**Example `models/responses/user.py`**
```python
from core.optionals import BaseResponse

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
```

## Optional: Create Serializers
Define serializers to convert Tortoise ORM models to Pydantic models in `serializer.py`.

**Example `serializers/user.py`:**
```python
from core.optionals import Serializer
from .models import UserResponse

class UserSerializer(Serializer):
    def __init__(self, entity: UserEntity):
        self.pd_model = UserResponse
        self.entity = entity

    def serialize(self):
        return self.entity
```

That's it! You've successfully set up the Ascender Framework, created a new project, configured your environment, and built your first controller. Continue exploring the documentation for more advanced features and best practices. Happy coding!