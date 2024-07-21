---
sidebar_position: 3
sidebar_label: "Controller Optionals"
---
# Controllers - Optionals

### Nature of optionals

When setting up a controller in the Ascender Framework, there are several optional components that can be included to enhance functionality and maintain a clean separation of concerns. Below is an outline of these optional components:

- **Models**:
    - Purpose: Define Pydantic objects for request form validation and response models
    - Types: DTOs (Data Transfer Objects) and Response Models.
    - Naming Convention: Suffix with `DTO` or `Response` (e.g., `UserDTO`, `UserResponse`).
- **Serializers**:
    - Purpose: Serialize complex database entity objects and other complex structures into Pydantic models.
    - Naming Convention: Suffix with `Serializer` (e.g., `UserSerializer`).
- **Services** (if many instead of one):
    - Purpose: Contains more complex business logic and data handling functions.
    - Cases: If there is many complex business logics for one controller, several services will be in `services` directory in the controller

***

### Optionals directory structure

We appreciate and follow SOLID principles and one of them is The **single-responsibility principle (SRP)**.

So we structured models and responses into directories, we strongly recommend developers to structure their DTO and Response classes following SRP: *Single class in a single file* even if model is very small.

Here's the example of optional's structure:
```
└── controllers
    └── <controller-name>
        ├── endpoints.py
        ├── service.py
        ├── repository.py
        └── models # One of optionals is Models
            ├── __init__.py # For namespacing
            ├── dtos
            │   └── user.py
            └── responses
                └── user.py
```

This example of optionals `Models` shows us how to properly structure and scale our controller adding additional components to the controller.

***

### Models (DTOs & Responses)

Let's dive deeper into `controller optionals` starting with Models.
Usually, there are two types of Pydantic models:
- **DTOs (Data Transfer Objects)**:
    - Data Transfer Objects (DTOs) are responsible for transferring data between components in a defined and specific format. They utilize Pydantic for validation, ensuring data integrity and correctness. In Ascender Framework DTOs are commonly used as the request body structure and for validation in API endpoints, facilitating clear and reliable data exchange within the system
- **Response objects**:
    - Response objects are responsible for returning structured API data. They also utilize Pydantic for validation and serialization into JSON format. In the Ascender Framework, responses are commonly used in services. When they are more complex structured, they can be used in combination with the controller optionals `Serializer`.

#### Example of defining Data Transfer Object (DTO)
```py
from core.optionals import BaseDTO
# Will work if you will use pydantic's types, fields and even itself
from pydantic import EmailStr


class UserDTO(BaseDTO):
    username: str
    email: EmailStr
    password: str
```

Add the `UserDTO` object into import namespace:
```py
from .dtos.user import UserDTO


__all__ = ["UserDTO"]
```

Usage example in the controller in `endpoints.py`
```py
...
from .models import UserDTO


@Controller()
class User:
    @Post("register")
    async def create_user(self, data: UserDTO):
        ...
```

#### Example of defining Response object
```py
from core.optionals import BaseResponse
# Will work if you will use pydantic's types, fields and even itself
from pydantic import EmailStr


class UserResponse(BaseResponse):
    id: int
    username: str
    email: EmailStr
```
We removed `password` and added `id` into response model, because it will be returned as HTTP response after finishing handling API request.

Add the `UserResponse` object into import namespace:
```py
from .dtos.user import UserResponse


__all__ = ["UserResponse"]
```

Usage example in the controller in `endpoints.py`
```py
...
from .models import UserDTO, UserResponse


@Controller()
class User:
    @Post("register")
    async def create_user(self, data: UserDTO):
        return UserResponse(id=1, **data.model_dump())
```
***

### Serializers (For complex objects)

The usage of Serializers in the Ascender Framework is not very common. They are employed when Response objects or DTO objects are more complex and have nested values and nuances. In such cases, using Serializers is the appropriate approach to handle the complexity and ensure proper data formatting and validation.

There are several types of Serializers in the Ascender Framework:

1. **Base Serializer**
    - The Base Serializer (`BaseSerializer`) accepts any uninitialized type of Model (DTO or Response) and a full database entity object as parameters. It outputs a serialized Model (DTO or Response).

2. **Specialized Serializer**
    - This type of Serializer needs to be defined and configured by the developer. It inherits from the Base Serializer class and handles more complex objects. Specialized Serializers are tailored for specific Models (DTO or Response), which should be complex and large.

3. **Queryset Serializer**
    - This serializer works with either the Base Serializer or Specialized Serializer. It serializes lists of entities or large queryset iterables. A useful example of this type of serializer is for a Pagination Response.

Each type of Serializer serves a unique purpose, ensuring flexibility and efficiency in handling different levels of data complexity within the framework.

#### Example of Specialized Serializer

Earlier we defined a few Models: `UserDTO` and `UserResponse`, now let's make a specific serializer for `UserResponse` using Base Serializer.

Here's the structure of Specialized Serializer:
```
└── controllers
    └── <controller-name>
        ├── endpoints.py
        ├── service.py
        ├── repository.py
        ├── models # The optionals that we defined earlier
        └── serializers # One of optionals is Serializers
            ├── __init__.py # For namespacing
            └── user.py
```

The example of basic Specialized Serializer:
```py
from core.optionals import Serializer
from ..models import UserResponse, UserDTO


class UserSerializer(Serializer):
    def __init__(self, entity: UserDTO, id: int):
        self.pd_model = UserResponse
        self.entity = entity
        self.values = {"id": id}

    def serialize(self):
        return self.entity
```

Very good! We successfully created basic Specialized Serializer, now we have to use it:
```py
...
from .models import UserDTO, UserResponse
from .serializers import UserSerializer


@Controller()
class User:
    @Post("register")
    async def create_user(self, data: UserDTO):
        return UserSerializer(data, id=1)() # We have to call __call__ method of the serializer class to build the serialized model
```

:::tip
We recommend using Serializers wisely to keep your code well-organized.

If there is no need to use Serializers, you can simply use Pydantic's `model_validate` method in Response objects or DTO objects.
:::