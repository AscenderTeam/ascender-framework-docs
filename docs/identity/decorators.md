---
sidebar_position: 2
sidebar_label: "Authorization Guards"
---
# Authorization Decorators

### Overview

Authorization guards in Ascender Framework Identity are in-box `guard decorators` that are used to apply authorization scope and rules on specific endpoint route.

:::note
Guards are decorators that can be wrapped over specific endpoint or entire controller to apply specific rules on endpoint (or controller) that is wrapped by guard decorator.

You can create your own Guard or use built-in like one with Authorization
:::

There are 5 authorization guard decorators available for use in Ascender Framework Identity:
1. **AuthRefresher**
    - Used for automatically refreshing token using `refresh_token`
    - You can do this manually using **IdentityManager** if you need customization of this process
2. **Authorize**
    - Used for validation and protecting endpoint routes from unauthorized access.
    - You can set requirements in parameters of this decorator.
3. **Claim**
    - Used to get user claims or user data in certain endpoint route where it was defined
    - It has `parameter_name` argument where you set the name of argument defined in controller's endpoint route function.
    - We recommend you to combine this decorator with **Authorize** decorator

### Using AuthRefresher

To use **AuthRefresher** decorator in controller endpoint you have to import it from `core.identity.decorators`

```python
from core.identity.decorators import AuthRefresher
```

Now we can use it in our controller, so let's create one:
```bash
ascender run ctrls new --name authrefresher
```

here what we will get:
```
controllers/
└── authrefresher/
    ├── endpoints.py
    ├── service.py
    └── repository.py
```

Now time to open `endpoints.py` and define new endpoint
```python
...
from core.identity.decorators import AuthRefresher

@Controller()
class Authrefresher:
    def __init__(self, authrefresher_service: AuthrefresherService):
        self.authrefresher_service = authrefresher_service
    
    @Get()
    @AuthRefresher(parameter_name="credentials")
    def get_endpoint(self, credentials: tuple[str] | None):
        return self.authrefresher_service.handle_refresh(credentials)
```

```python
...

class AuthrefresherService(Service):
    ...
    def handle_refresh(self, credentials: tuple[str] | None):
        if not credentials:
            return None # You can raise HTTPException 401 if you want
        
        access_token, refresh_token = credentials

        return {
            "access_token": access_token,
            "refresh_token": refresh_token
        }
```