# Eagle Estates - Part 2

### To-Do's
- Add fields using the correct Python class. Ensure that the `fields` library is imported.
- Add the necessary attributes in each field.

### Notes
- Note that the label of a field, if not provided as an attribute, is automatically set from the variable name e.g. `construction_date` will become `Construction Date`.
- There are useful methods in specific field classes e.g. `today()` method in `Date` class.

If the fields are added correctly to the `eagle.property` model, it should resemble the following:
```python
from odoo import models, fields


class EagleProperty(models.Model):
    _name = 'eagle.property'
    _description = 'Eagle Property'

    name = fields.Char(required=True)
    construction_date = fields.Date(default=fields.Date.today(), required=True)
    area = fields.Float('Area (sq ft)')
```
