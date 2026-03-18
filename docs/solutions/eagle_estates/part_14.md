# Eagle Estates - Part 14

### To-Do's

- Add a computed integer field `room_count` to the `eagle.property` model.
- The compute method should calculate the number of rooms from the length of `room_ids` field.
- In the form view of `eagle.property`, remove the existing `room_ids` field.
- Add a smart button inside the `sheet` element and add the computed integer field as a stat and an appropriate
  fontawesome icon.
- Add a Python method that returns an action to open the list view of the rooms.
- Add a button labeled _Create Room_ inside the `header` element of the form view.
- Add a Python method that returns an action to open the form view of `eagle.property.room`.
- Disable creation of `eagle.property.room` records from its views by adding `create="false"` to the `list` element.

### Notes

- When viewing rooms, we should add a domain in the action to filter rooms by the current property.
- Similarly, when creating a new room, we should set a default value for the `property_id` field. This can be
  done by adding a `context` key to the action that opens the view.

### Properties

#### Model:

```python
room_count = fields.Integer(compute="_compute_room_count")

@api.depends("room_ids")
def _compute_room_count(self):
    for record in self:
        record.room_count = len(record.room_ids)

def action_view_rooms(self):
    action = self.env.ref("eagle_estates.eagle_property_rooms_action").read()[0]
    action["domain"] = [("property_id", "=", self.id)]
    return action

def action_create_room(self):
    action = self.env.ref("eagle_estates.eagle_property_rooms_action").read()[0]
    action.update({
      "context": {"default_property_id": self.id},
      "views": [(False, "form")]
    })
    return action
```

#### View:

```xml
<record id="view_eagle_property_form" model="ir.ui.view">
    ...
        <field name="arch" type="xml">
            <header>
                <button name="action_create_room" string="Create Room" type="object"/>
            </header>
            <sheet>
                <div class="oe_button_box" name="button_box">
                    <button 
                            class="oe_stat_button"
                            name="action_view_rooms"
                            type="object"
                            icon="fa-list"
                            invisible="not room_count"
                    >
                        <field string="Rooms" name="room_count" widget="statinfo"/>
                    </button>
                </div>
                ...
            </sheet>
        </field>
</record>
```

### Rooms

#### View:

```xml
<record id="view_eagle_property_room_list" model="ir.ui.view">
    ...
    <field name="arch" type="xml">
        <list create="false">
            ...
        </list>
    </field>
</record>
```
