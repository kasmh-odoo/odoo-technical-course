# Eagle Estates - Part 7

### To-Do's

- Add both `_rec_name` and `_order` to the `eagle.property` model.

### Notes

- `_rec_name` defaults to the `name` field. If a model has no name field, then `_rec_name` must be set to a field that
  exists on the model, otherwise records will be displayed in the format `(<model_name>, <record_id>)`.
- `_order` defaults to `id ASC`. If a different sort is desired then `_order` is set to a field that exists in the
  model, otherwise records will be displayed in the order they were created.

After adding the properties, the full model `eagle.property` should look as follows:

```python
from odoo import models, fields


class EagleProperty(models.Model):
    _name = 'eagle.property'
    _description = 'Eagle Property'
    _order = 'construction_date DESC, id'
    # There is no need to explicitly set _rec_name to name since this is the default case
    _rec_name = 'name'

    name = fields.Char(required=True)
    construction_date = fields.Date(default=fields.Date.today(), required=True)
    area = fields.Float('Area (sq ft)')
```
