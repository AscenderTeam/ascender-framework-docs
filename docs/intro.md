---
sidebar_position: 1
sidebar_label: "Introduction"
---

# Introduction to the Ascender Framework

Welcome to the Ascender Framework! This powerful framework, inspired by FastAPI and NestJS, provides a structured and modular approach to building scalable web applications. Whether you're new to web development or an experienced developer, Ascender offers the tools and structure to help you create robust applications efficiently.

## Key Features
- **Modular Architecture**: Inspired by NestJS, the framework promotes a modular approach, making it easy to manage and scale your applications.
- **FastAPI Integration**: Leverages FastAPI for fast, asynchronous APIs with automatic interactive documentation.
- **Built-in CLI**: Simplifies project setup, controller creation, database migrations, and other tasks with a powerful command-line interface.
- **Database Management**: Provides ability to choose database ORM driver between Tortoise ORM and SQLAlchemy. 
- **Pydantic Models**: Ensures data validation and serialization using Pydantic.
- **Asynchronous Support**: Full support for asynchronous programming, enhancing performance and scalability.

## Core Components
1. **Controllers**: Handle incoming requests and return responses. Controllers are the entry points to your application.
2. **Services**: Contain business logic and data transformation.
3. **Repositories**: Manage data fetching and database interactions.
4. **Models**: Define data structures using Pydantic for validation and serialization.
5. **Serializers**: Convert Tortoise ORM models to Pydantic models for API output.

## Getting Started
To help you get up and running quickly, we've provided a comprehensive getting started guide. Here’s a brief overview:

1. **Install the CLI Helper**: Simplifies project creation and management.
2. **Create a New Project**: Sets up the project structure and installs dependencies.
3. **Configure the Project**: Modify `bootstrap.py` for server settings and controller registration.
4. **Run the Application**: Start the server and begin developing your application.
5. **Create Controllers, Services, and Repositories**: Generate these components using the CLI for organized code.
6. **Manage Database Migrations**: Initialize and migrate your database schema effortlessly.

## Example Code
Here’s a quick example to give you a feel for the framework's structure:


**Controller Example (`endpoints.py`)**:
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

**Service Example (`service.py`)**:
```python
from core.extensions.services import Service

class TestService(Service):
    def __init__(self, repository: TestRepo):
        self._repository = repository

    async def get_hello(self):
        return "Hello world"
```

**Repository Example (`repository.py`)**:
```python
from core.extensions.repository import Repository
from core.database.dbcontext import AppDBContext

class TestRepo(Repository):
    def __init__(self, _context: AppDBContext | None):
        self._context = _context
    
    # Add methods to fetch data
```

## Documentation and Support
- **Comprehensive Documentation**: Detailed guides and API references to help you at every stage of your development journey.
- **Community and Support**: Join the community for discussions, tips, and support from other developers and the Ascender team.

With the Ascender Framework, you have all the tools you need to build high-performance, scalable web applications. Dive into the documentation, start creating, and unleash the full potential of your development skills with Ascender!