# Eagle Estates - Part 9

### To-Do's

- Add address fields to the `eagle.property` and `eagle.property.room` models
- Add a `construction_date` field to the `eagle.property.room` model, and make it related
- Add an `age` field to the `eagle.property` model, and make it computed or linked to an onchange function
- Make the `area` field on the `eagle.property` model computed
- Add constraints on both `construction_date` and `name` fields

### Notes

- `state_id` and `country_id` are **Many2one** fields, linked to `res.country` and `res.country.state` respectively
- We can use the `relativedelta` method available through the `dateutil` library to calculate the age of a property
- Onchange functions are only triggered if the fields used in the decorator and the field that is being changed are 
  on the view we are accessing, so be sure to add both `age` and `construction_date` to the **Properties** form view
  - By convention, **onchange** methods should be named `_onchange_<FIELD_NAME>`
  - By convention, **compute** methods should be named `_compute_<FIELD_NAME>`
- When using `api.constrains` functions, we can raise a `ValidationError` if the constraint is not met
  - By convention, **python constraints** should be named `_constrain_<FIELD_NAME>`

### Address Fields:

```python

# Fields on the `eagle.property` model

street = fields.Char()
street2 = fields.Char()
zip = fields.Char()
city = fields.Char()
state_id = fields.Many2one("res.country.state", string='State', ondelete='restrict', domain="[('country_id', '=?', country_id)]")
country_id = fields.Many2one('res.country', string='Country', ondelete='restrict')


# (Related) Fields on the `eagle.property.room` model

street = fields.Char(related='property_id.street')
street2 = fields.Char(related='property_id.street2')
zip = fields.Char(related='property_id.zip')
city = fields.Char(related='property_id.city')
state_id = fields.Many2one(related='property_id.state_id')
country_id = fields.Many2one(related='property_id.country_id')
```

```xml
<!-- Add Address fields on both the **Properties** & **Rooms** form views -->
<group name="address_details">
    <label for="street" string="Address"/>
    <div class="o_address_format">
        <field name="street" placeholder="Street..." class="o_address_street"/>
        <field name="street2" placeholder="Street 2..." class="o_address_street"/>
        <field name="city" placeholder="City" class="o_address_city"/>
        <field name="state_id" class="o_address_state" placeholder="State"/>
        <field name="zip" placeholder="ZIP" class="o_address_zip"/>
        <field name="country_id" placeholder="Country" class="o_address_country"/>
    </div>
</group>
```

### Construction Date:

```python
# (Related) `construction_date` field on the `eagle.property.room` model
construction_date = fields.Date(related='property_id.construction_date')
```

### Age:

```python
age = fields.Integer("Age")

@api.onchange('construction_date')
def _onchange_construction_date(self):
    self.age = (self.construction_date and relativedelta(fields.Date.today(), self.construction_date).years) or 0
```

```xml
<!-- Add the `age` field on the `eagle.property` model -->
<field name="age"/>
```

### Area:
```python
area = fields.Float(compute='_compute_area')

@api.depends('room_ids')
def _compute_area(self):
    for record in self:
        record.area = sum(record.room_ids.mapped('area'))
```

### Constraints:
```python
from odoo.exceptions import ValidationError

_unique_name = models.Constraint(
    'UNIQUE(name)',
    'Property name must be unique'
)
    
@api.constrains('construction_date')
def _constrain_construction_date(self):
    for record in self:
        if record.construction_date > fields.Date.today():
            raise ValidationError("Construction date can't be in the future")
```


### Important Notes:

Odoo is slowly moving away from `onchange` fields. In the case of the age field, the same behavior can be achieved using a stored compute field:

```python
age = fields.Integer("Age", compute="_compute_age", inverse="_inverse_age", readonly=False)

@api.depends('construction_date')
def _compute_age(self):
    for property_id in self:
        property_id.age = (property_id.construction_date and relativedelta(fields.Date.today(), property_id.construction_date).years) or 0

def _inverse_age(self):
    for property_id in self:
        property_id.construction_date = fields.Date.today() - relativedelta(years=property_id.age)
```

The only downside to this solution is that the changes only take effect upon Saving a record (when the write method is invoked)
