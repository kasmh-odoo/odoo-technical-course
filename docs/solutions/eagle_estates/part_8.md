# Eagle Estates - Part 8

### To-Do's

- Create two new models, `eagle.property.room` and `eagle.tag`.
- Create the following items for each of the new models except for the form view which will be only
  for `eagle.property.room`:
    - list view
    - window action
    - menu item
    - model access right
- Add the following fields to the `eagle.property` model:
    - **room_ids**: a `One2many` field with `eagle.property.room` as `comodel_name` and `property_id` as
      `inverse_name`
    - **tag_ids**: a `Many2many` field with `eagle.tag` as `comodel_name`
- Add the following fields to the `eagle.property.room` model:
    - **room_type**: a `Selection` field with the following
      values: *living*, *dining*, *kitchen*, *bedroom*, *bathroom*, *garage*, *other*
    - **area**: a `Float` field to store the area of the room in square meters
    - **property_id**: a `Many2one` field with `eagle.property` as `comodel_name`.

### Notes

- `One2many` fields require a `Many2one` field on the other model (*comodel*) that will act as the inverse field.
- `Many2many` field values are stored in a separate table, and therefore do not require an inverse field.

### Rooms:

#### Model:

```python
from odoo import models, fields


class EaglePropertyRoom(models.Model):
    _name = 'eagle.property.room'
    _description = 'Eagle Property Room'

    room_type = fields.Selection([('bedroom', 'Bedroom'), ('bathroom', 'Bathroom'), ('dining', 'Dining Room'),
                             ('living', 'Living Room'), ('garage', 'Garage'), ('kitchen', 'Kitchen'),
                             ('other', 'Other')], default="other")
    area = fields.Float()
    property_id = fields.Many2one('eagle.property')
```

#### Security:

```csv
access_eagle_property_room,access_eagle_property_room,model_eagle_property_room,,1,1,1,1
```

#### Views:

```xml
<!-- Form View -->
<record id="view_eagle_property_room_form" model="ir.ui.view">
    <field name="name">eagle.property.room.form</field>
    <field name="model">eagle.property.room</field>
    <field name="arch" type="xml">
        <form>
            <sheet>
                <group>
                    <field name="room_type"/>
                    <field name="area"/>
                    <field name="property_id"/>
                </group>
            </sheet>
        </form>
    </field>
</record>

<!-- List View -->
<record id="view_eagle_property_room_list" model="ir.ui.view">
    <field name="name">eagle.property.room.list</field>
    <field name="model">eagle.property.room</field>
    <field name="arch" type="xml">
        <list>
            <field name="room_type"/>
            <field name="area"/>
            <field name="property_id"/>
        </list>
    </field>
</record>
```

#### Window Action:

```xml

<record id="eagle_property_rooms_action" model="ir.actions.act_window">
    <field name="name">Rooms</field>
    <field name="res_model">eagle.property.room</field>
    <field name="view_mode">list,form</field>
</record>
```

#### Menuitem:

```xml

<menuitem id="menu_eagle_property_rooms" name="Rooms" action="eagle_property_rooms_action" sequence="20"/>
```

### Tags:

#### Model:

```python
from odoo import models, fields


class EagleTag(models.Model):
    _name = 'eagle.tag'
    _description = 'Eagle Tag'

    name = fields.Char(required=True)
```

#### Security:

```csv
access_eagle_tag,access_eagle_tag,model_eagle_tag,,1,1,1,1
```

#### Views:

```xml
<!-- List View -->
<record id="view_eagle_tag_list" model="ir.ui.view">
  <field name="name">eagle.tag.list</field>
  <field name="model">eagle.tag</field>
  <field name="arch" type="xml">
      <list editable="bottom">
          <field name="name"/>
      </list>
  </field>
</record>
```

#### Window Action:

```xml

<record id="eagle_tags_action" model="ir.actions.act_window">
    <field name="name">Tags</field>
    <field name="res_model">eagle.tag</field>
    <field name="view_mode">list</field>
</record>
```

#### Menuitem:

```xml

<menuitem id="menu_eagle_tags" name="Tags" action="eagle_tags_action" sequence="30"/>
```

### Properties:

#### Model:

```python
tag_ids = fields.Many2many('eagle.tag', string="Tags")
room_ids = fields.One2many('eagle.property.room', 'property_id', string="Rooms")
```

#### Views:

```xml

<group>
    <field name="tag_ids"/>
    <field name="room_ids"/>
</group>
```

### Manifest:

```python
'application': True
```
