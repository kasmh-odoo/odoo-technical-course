# Eagle Estates - Part 11

### To-Do's

- Add a `eagle_tag_data.xml` file to define tags
- Add a `eagle_property_data.xml` file to define properties
- Use **magic numbers/commands** to link tags & properties

### Notes

- Data can be loaded into Odoo using XML or CSV files. This is usually done by defining data files in the `data` folder and loading them in the `__manifest__.py` file
- Data file naming should follow the convention of `<MODEL_NAME>_data.xml` or `<MODEL.NAME>.csv`
  - Ex: `eagle_tag_data.xml` or `eagle.tag.csv`

### Tags data:

```xml
<record id="eagle_tag_residential" model="eagle.tag">
    <field name="name">Residential</field>
</record>

<record id="eagle_tag_commercial" model="eagle.tag">
    <field name="name">Commercial</field>
</record>
```

### Properties data:

```xml
<record id="eagle_property_apartment_217" model="eagle.property">
    <field name="name">Apartment 217</field>
    <field name="construction_date">2009-10-01</field>
</record>

<record id="eagle_property_apartment_9905" model="eagle.property">
    <field name="name">Apartment 9905</field>
    <field name="construction_date">2010-04-24</field>
</record>

<record id="eagle_property_burj_khalifa" model="eagle.property">
    <field name="name">Burj Khalifa</field>
    <field name="area">5670000</field>
    <field name="construction_date">2009-10-01</field>
    <field name="street">1 Sheikh Mohammed bin Rashid Blvd</field>
    <field name="zip">00000</field>
    <field name="city">Dubai</field>
    <field name="state_id" ref="base.state_ae_du"/>
    <field name="country_id" ref="base.ae"/>
</record>
```

### Using Commands to link records:
    
```xml
<record id="eagle_property_burj_khalifa" model="eagle.property">
  ...
  <field name="tag_ids" eval="[
      Command.clear(),
      Command.link(ref('eagle_tag_residential')),
      Command.link(ref('eagle_tag_commercial')),
  ]"/>
  <field name="child_ids" eval="[
      Command.clear(),
      Command.link(ref('eagle_property_apartment_217')),
      Command.link(ref('eagle_property_apartment_9905'))
  ]" />
  ...
</record>
```
