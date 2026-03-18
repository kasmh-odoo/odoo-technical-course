# Eagle Estates - Part 12

### To-Do's

- Override the `_compute_display_name` to display properties using `name` and `construction_date`
- Override the `create` to call the `_onchange_construction_date` to set the age. This can be skipped if the `age` field is set through a compute method instead

### Notes

- Data can be loaded into Odoo using XML or CSV files. This is usually done by defining data files in the `data` folder and loading them in the `__manifest__.py` file
- Data file naming should follow the convention of `<MODEL_NAME>_data.xml` or `<MODEL.NAME>.csv`
  - Ex: `eagle_tag_data.xml` or `eagle.tag.csv`

### `_compute_display_name`:
```python
@api.depends('name', 'construction_date')
def _compute_display_name(self):
    for record in self:
        name = record.name or ''
        if record.construction_date:
            name = f"{name} | {record.construction_date}"
        record.display_name = name
```

### `create`:
```python
@api.model_create_multi
def create(self, vals_list):
    res = super().create(vals_list)
    for record in res:
        if not record.age:
            record._onchange_construction_date()
    return res
```

We will have more examples for other ORM methods later on as we explore more features of Odoo.
