# Eagle Estates - Part 5

### To-Do's
- Add a window action using its model `ir.actions.act_window` **before** the menu item.
- Link the window action to the submenu item using the `action` attribute in the menu item element.

### Notes
- A menu item without a linked action or a submenu does **not** appear in the view.
- Window actions must be always defined before menu items so that menu items can find their references.
- Window actions have useful fields one of which can be used to filter records in the views.

Adding the window action would have the following code or so:
```xml
<record id="eagle_properties_action" model="ir.actions.act_window">
    <field name="name">Properties</field>
    <field name="res_model">eagle.property</field>
    <field name="view_mode">list,form</field>
</record>
```
