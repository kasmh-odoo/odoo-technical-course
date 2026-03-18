# Eagle Estates - Part 8

It is time to expand the Eagle Estates module and add the following features:

- Add a new model for rooms in a property, dubbed `eagle.property.room`:
    - **room_type**: a `Selection` field with the following
      values: *living*, *dining*, *kitchen*, *bedroom*, *bathroom*, *garage*, *other*
    - **area**: a `Float` field to store the area of the room in square feet
    - **property_id**: a `Many2one` field with `eagle.property` as `comodel_name`
- Add a new model for tags, dubbed `eagle.tag`. This will be used to apply tags to properties, and later on, to
  tenants and contracts. Add the following field:
    - **name**: a `Char` field to store the name of the tag

Once the new models are defined, the following changes should be done:

- Add two new fields in the `eagle.property` model:
    - **room_ids**: a `One2many` field with `eagle.property.room` as `comodel_name` and `property_id` as
      `inverse_name`
    - **tag_ids**: a `Many2many` field with `eagle.tag` as `comodel_name`
- Add both of these fields somewhere in the form view of `eagle.property`.

Currently, when searching for the Eagle Estates module in Apps, it does not appear with the **Apps** filter in
the search view because it is not considered an app. To fix this, add `'application': True` in the
manifest.
