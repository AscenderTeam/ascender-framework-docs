---
sidebar_position: 2
sidebar_label: "Controllers"
---
# Controllers - Basic

### Creating a controller

There are two types of controllers:
- Base Controller
- Authentication Controller

To create base controller, use ascender-framework cli:
```bash
$ ascender run ctrls new --name <controller-name>
```

To create authentication controller, use ascender-framework cli:
```bash
$ ascender run ctrls identity --name <controller-name>
```

***

### Managing controllers

Usually base controller has very easy structure, containing only three files.
```
├── controllers
│   └── <controller-name>
│       ├── endpoints.py
│       ├── service.py
│       └── repository.py
```
These three files are necessery files and components for any types of controllers. These three files are define the controller in Ascender Framework.

Here are a few information about these components:
1. `endpoints.py` - Responsible for defining API endpoints or API routes
2. `service.py` - Responsible for business logic of controller. Each controller has it's own business logic.
3. `repository.py` - Responsible for fetching and querying database and for data management

***

### Controller endpoints definition & structure

To define controller, you have to use `@Controller()` decorator from `core.utils.controller`.

To define API endpoints, you have to use specific decorators from `core.utils.controller`.

Here are decorators that defines methods of endpoints:
1. `@Get()` - Defines GET method for an API endpoint
2. `@Update()` - Defines UPDATE method for an API endpoint
3. `@Put()` - Defines PUT method for an API endpoint
4. `@Delete()` - Defines DELETE method for an API endpoint
5. `@Post()` - Defines POST method for an API endpoint

Example of building endpoints in controller in `<controller-name>/endpoints.py`:
```py
from controllers.app.repository import AppRepo
from controllers.app.service import AppService
from core.utils.controller import Controller, Get, Post


@Controller()
class App:
    def __init__(self, app_service: AppService) -> None:
        self.app_service = app_service

    @Get()
    async def get_app_endpoint(self):
        return await self.app_service.get_function()
    
    @Post()
    async def post_app_endpoint(self):
        return await self.app_service.post_function()
```

***

### Controller Setup function

In the Ascender Framework the `setup` function in a controller is crucial for configuring and registering the components that the controller will use. This function ensures that the dependencies such as services and repositories are properly instantiated and linked to the controller, facilitating a modular and organized structure.

**Purpose of the setup Function**
1. Dependency Injection:
    - The `setup` function allows for the registration of services and repositories that the controller will depend on. This promotes a clean separation of concerns and facilitates easier testing and maintenance
2. Component Registration:
    - It registers the controller class along with its associated services and repositories, ensuring they are correctly instantiated and available for use when the application runs.
3. Controller configuration:
    - If the framework uses plugins that alter the controller and its logic, the necessary configuration for the controller should be specified in the `setup` function if required by the plugin.

**Definition and Location of `setup()` Function**
In the Ascender Framework, the `setup()` function is defined within the `endpoints.py` file of a controller. This function is crucial for configuring the controller, services, and repositories that are used to handle HTTP requests.

Example of `setup()` function:
```py
from controllers.app.repository import AppRepo
from controllers.app.service import AppService
from core.types import ControllerModule
from core.utils.controller import Controller, Get, Post


@Controller()
class App:
    def __init__(self, app_service: AppService) -> None:
        self.app_service = app_service
    ...


def setup() -> ControllerModule:
    return {
        "controller": App,
        "services": {
            "app": AppService
        },
        "repository": AppRepo,
        "plugin_configs": {}
    }
```

The `setup` function should return `ControllerModule` dictionary that contains 4 keyword parameters:
1. `controller` (Necessery parameter)
    - This key specifies the controller class that defines the HTTP endpoints.
    - It is a necessary parameter that links the endpoints to their respective controller class.
2. `services` (Optional but recommended parameter)
    - This key maps the service classes that provide business logic and handle data transformations.
    - Services are injected into the controller, ensuring the controller remains focused on handling HTTP requests. *We don't recommend handling business logic in controller itself!*
3. `repository` (Optional parameter)
    - This key specifies the repository class that manages data access and database interactions.
    - Repositories handle CRUD operations and encapsulate database queries.
4. `plugin_configs` (Optional parameter)
    - This key specifies configurations for plugins, if there is plugin that requires configuration for specific controller and modifies it's logic