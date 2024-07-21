---
sidebar_position: 4
sidebar_label: "Controller DI"
---
# Controllers - Dependency Injection (DI)

### Introduction to Dependency Injection (DI)

Dependency Injection (DI) is a design pattern used to implement Inversion of Control (IoC), where the control of creating and managing dependencies is shifted from the class itself to an external entity. This means that instead of a class creating its own dependencies, they are provided to it from the outside.

### Dependency Injection in Controllers

In The Ascender Framework, Dependency Injection (DI) enables developers to access one controller's class or object from within another controller.

Consider we have two controllers: Controller A and Controller B, each with their own business logic encapsulated in services. Sometimes, Controller B might need to use functions provided by Controller A. To address this, we can use DI by injecting the service of Controller A into the service of Controller B. This approach ensures that Controller B can utilize the necessary functions of Controller A without tightly coupling their implementations.

### Using DI in Controller Services

Now let's dive deeper into practice! To use Dependency Injection in the service of a controller, you need to define a parameter with an annotation of the class you want to inject into your service. The class to be injected must be registered in The Ascender Framework's Singleton Registry.

Here's an example of the implementation
```py
...
from controllers.controller_b import ControllerBService

class AppService(Service):
    # Inquire the DI class of other controller's service
    service_b: ControllerBService

    async def get_hello(self):
        # You can use it now in every method except __init__ and __mounted__
        return await service_b.call_serviceb_method()
```

### Defining Your Own DI Class

To define your own Dependency Injection (DI) class, you can create a service for a controller and specify it in the `setup` function of the controller.

```python
def setup() -> ControllerModule:
    return {
        "controller": ExampleController,
        "service": {
            "di": DiService  # The service will be added to the singleton registry
        },
        ...
    }
```

### Defining Injectable Classes

You can also define an injectable class by adding it to the singleton registry manually. There are two options for defining your own singleton:

1. Define your singleton inside the `Bootstrap` class in `bootstrap.py`.
2. Define your singleton outside the `Bootstrap` class.

#### Defining Singleton Inside the `Bootstrap` Class

To define your singleton inside the `Bootstrap` class, invoke the `add_singleton` method in the `service_registry` of the `Application` class:

```python
from core.application import Application

class Bootstrap:
    @staticmethod
    def server_boot_up(app: Application):
        app.service_registry.add_singleton(DIMethod, DIMethod())  # Interface, Object itself
```

In this example, `service_registry.add_singleton` requires two parameters:

1. **Interface of the Object**:
   - You can define your own interface that represents your DI object.
   - Alternatively, you can pass an instance of your DI object as an interface by specifying its type without initializing it.

2. **The DI Object**:
   - Any object you want to add to the singleton registry.

By following these steps, you can effectively define and register your own DI classes and objects, ensuring they are available for injection throughout your application. This approach helps maintain a clean and modular architecture, making your code more maintainable and testable.

#### Defining Your Own Singleton

To define your own singleton outside the `Bootstrap` class, you need to import the `ServiceRegistry` and initialize it.

:::warning
Be careful when you define and use singletons! Avoid using singletons for storing data that can be updated simultaneously by multiple threads or processes.
:::

```python
from core.registries.service import ServiceRegistry
from example import ExampleDI

service_registry = ServiceRegistry()
service_registry.add_singleton(ExampleDI, ExampleDI())
```

The `ServiceRegistry` is itself a singleton, so you can initialize and use it from anywhere in your application.

By following these steps, you can effectively manage and utilize Dependency Injection in your controllers, ensuring a clean, maintainable, and testable codebase.