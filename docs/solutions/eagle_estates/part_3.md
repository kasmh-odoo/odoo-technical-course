# Eagle Estates - Part 3

### To-Do's
- Add a new folder called `views` and add an XML file inside it.
- Define two view records in the XML file, one for the form view and other for the list view.

### Notes
- Wrap all the XML code in an `<odoo>` element.
- For view file names, the naming convention is `<model_name>_views.xml` e.g. `eagle_property_views.xml`.
- For view record IDs, usually the model name and view type is added without any strict naming convention e.g. `view_eagle_estates_form`.

If the views are added correctly, they should be similar to the following:
```xml
<odoo>
    <record id="view_eagle_property_list" model="ir.ui.view">
        <field name="name">eagle.property.list</field>
        <field name="model">eagle.property</field>
        <field name="arch" type="xml">
            <list>
                <field name="name"/>
                <field name="construction_date"/>
                <field name="area"/>
            </list>
        </field>
    </record>
    
    <record id="view_eagle_property_form" model="ir.ui.view">
        <field name="name">eagle.property.form</field>
        <field name="model">eagle.property</field>
        <field name="arch" type="xml">
            <form>
                <sheet>
                    <group>
                        <group>
                            <field name="name"/>
                            <field name="construction_date"/>
                            <field name="area"/>
                        </group>
                    </group>
                </sheet>
            </form>
        </field>
    </record>
</odoo>
```
