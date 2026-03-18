# Eagle Estates - Part 1

### To-Do's
- Create a new module named `eagle_estates`. This module will allow us to manage properties, tenants, contracts and much more!
- Create the `__init__.py` and `__manifest__.py` files and a new folder `models` with another `__init__.py` inside it.
- Create a new model called `eagle.property` that will allow us to manage properties. We will add onto this model in the next part.

### Notes
Please note the following when creating the new model:
- The `eagle.property` model should extend the `models.Model` base class, as it will allow for creation of persistent records.
- By convention, the naming of the Python files linked to a model should follow the snake case e.g. `eagle_property.py`.
- Each model should be contained in its own separate file for maintainability and readability.

Once done, the file structure of the module should look like this:
```text
eagle_estates
├── models
│   ├── __init__.py
│   └── eagle_property.py
├── __init__.py
└── __manifest__.py
```

And the model should be as follows:
```python
from odoo import models


class EagleProperty(models.Model):
    _name = 'eagle.property'
    _description = 'Eagle Property'
```
