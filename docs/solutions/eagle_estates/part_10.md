# Eagle Estates - Part 10

### To-Do's

- Add `parent_id` and `child_ids` fields to the `eagle.property` model
- Update the existing **Properties** window action and create a new one, to display **Compounds** and **Units** respectively
- Use the `context` to set a default name for the properties:
  - **Compounds**: "New Compound"
  - **Units**: "New Unit"
- Use the `domain` to filter the properties displayed through the **Compounds** and **Units** action

### Notes

- to set a default value through the context, you can use this syntax to set a `key` in the context : `default_<FIELD_NAME>`

### Parent/Child relationships:

```python
parent_id = fields.Many2one('eagle.property', string="Parent Property")
child_ids = fields.One2many('eagle.property', 'parent_id', string="Child Properties")
```
We can add the `parent_id` field to the **Properties** views, but there is no need to add the `child_ids` _just yet_.

```xml
<!-- Add the parent_id field to the properties views -->
<field name="parent_id"/>
<field name="child_ids"/>
```

### Window Actions:

```xml
<record id="eagle_properties_compounds_action" model="ir.actions.act_window">
    <field name="name">Compounds</field>
    <field name="res_model">eagle.property</field>
    <field name="view_mode">list,form</field>
    <field name="domain">[('parent_id', '=', False)]</field>
    <field name="context">{'default_name': "New Compound"}</field>
</record>

<record id="eagle_properties_units_action" model="ir.actions.act_window">
    <field name="name">Units</field>
    <field name="res_model">eagle.property</field>
    <field name="view_mode">list,form</field>
    <field name="domain">[('parent_id', '!=', False)]</field>
    <field name="context">{'default_name': "New Unit"}</field>
</record>
```

### Menu Items:
    
```xml
<menuitem id="eagle_estates_properties" name="Properties" sequence="10">
    <menuitem name="Compounds" sequence="10" id="eagle_estates_properties_compounds"
              action="eagle_properties_compounds_action"/>
    <menuitem name="Units" sequence="20" id="eagle_estates_properties_units" 
              action="eagle_properties_units_action"/>
</menuitem>
```
