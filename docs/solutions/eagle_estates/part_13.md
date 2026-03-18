# Eagle Estates - Part 13

### To-Do's

- One suggested location to add the `child_ids` field in the form view of `eagle.property` is by adding a notebook page.
- Add a dynamic attribute to set the `invisible` attribute based on if the `parent_id` is set.
- In the embedded list view of `child_ids`, add the necessary fields as columns.

```xml
<notebook>
    <page name="apartments_houses" string="Apartments/Houses">
        <group>
            <field name="parent_id" invisible="child_ids"/>
        </group>
        <field name="child_ids" invisible="parent_id">
            <list>
                <field name="name"/>
                <field name="construction_date"/>
                <field name="area"/>
                <field name="age"/>
            </list>
        </field>
    </page>
</notebook>
```
