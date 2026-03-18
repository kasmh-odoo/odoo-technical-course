# Eagle Estates - Part 15

### To-Do's

- Add a button in the form view of `eagle.property.room` called _Calculate Area_.
- Bind a Python method to this button that returns an action to open a wizard.
- Create a new folder `wizards` inside the module and add all Python and XML files related to the wizard here.
- Create a transient model called `eagle.property.room.area.wizard` with two float fields `length` and `width` measured
  in feet.
- Add a third field `area` that is computed from the product of length and width.
- Add a fourth field `room_id` that is a `Many2one` to `eagle.property.room`.
- When the wizard is confirmed, the area should be set to the `area` field of the room.
- Define access rights for the new transient model.

### Notes

- The wizard should be opened in a dialog by setting `target="new"` in the action returned from the Python method.
- In the returned action, add in the context `{"default_room_id": self.id}` to set the `room_id` field of the wizard as the current room.
- The _Cancel_ button of the wizard uses the attribute `special="cancel"` to close the dialog.

### Transient Model:

```python
from odoo import models, fields, api


class EaglePropertyRoomAreaWizard(models.TransientModel):
    _name = 'eagle.property.room.area.wizard'
    _description = 'Property Room Area Wizard'

    length = fields.Float()
    width = fields.Float()
    area = fields.Float(compute="_compute_area")
    room_id = fields.Many2one('eagle.property.room')

    @api.depends('length', 'width')
    def _compute_area(self):
        for record in self:
            record.area = record.length * record.width

    def action_confirm(self):
        self.room_id.area = self.area
        return {'type': 'ir.actions.act_window_close'}
```

Add a method on `eagle.property.room` that opens the wizard:
```python
    def action_open_area_wizard(self):
        return {
            "type": "ir.actions.act_window",
            "res_model": "eagle.property.room.area.wizard",
            "view_mode": "form",
            "target": "new",
            "context": {"default_room_id": self.id}
        }

```

### Views:

```xml
<odoo>
    <record id="view_eagle_property_room_area_wizard_form" model="ir.ui.view">
        <field name="name">eagle.property.room.area.wizard.form</field>
        <field name="model">eagle.property.room.area.wizard</field>
        <field name="arch" type="xml">
            <form>
                <sheet>
                    <group>
                        <group>
                            <field name="length"/>
                        </group>
                        <group>
                            <field name="width"/>
                        </group>
                    </group>
                    <group>
                        <field name="area"/>
                    </group>
                </sheet>
              <footer>
                    <button name="action_confirm" string="Confirm" type="object" class="btn-primary"/>
                    <button string="Cancel" special="cancel"/>
              </footer>
            </form>
        </field>
    </record>
</odoo>
```

Update the Eagle Property Room form view to show a button that opens the wizard:
```xml
<header>
    <button name="action_open_area_wizard" string="Compute Area" type="object"/>
</header>
```
### Security
```csv
access_eagle_property_room_area_compute_wizard,access_eagle_property_room_area_compute_wizard,model_eagle_property_room_area_wizard,base.group_user,1,1,1,1
```

::: tip
Be sure to update the `__init__.py` files with correct imports, and update the `__manifest__.py` to include the views for the wizard.
:::
