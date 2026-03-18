# Eagle Estates - Part 13

In compounds and buildings, there can be multiple apartments or houses and we have already established this idea through
the `Many2one` and `One2many` fields which are the parent field and the children field respectively. Now, we need to be
able to view the list of apartments/houses in the compound/building form view.

- Add the `child_ids` field in the form view of `eagle.property`.
- Make the field visible only if `parent_id` is not set on the same record. This is to prevent further hierarchy
  levels (grandchildren) of records.
- Similarly, make the `parent_id` visible only if the record has no children.
- Add an embedded list view for this field to display the following columns only:
    - Name
    - Construction Date
    - Area
    - Age
