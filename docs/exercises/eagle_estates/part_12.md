# Eagle Estates - Part 12

When you try to select a property through a Many2one field, you can search properties by their name only. The same applies when the properties are displayed in a Many2one field: only their names are displayed.

We want to change this so that the construction_date is used not only to search for a property, but is also displayed alongside the name.

- Override the `_compute_display_name` method of the `eagle.property` model to display the `construction_date` alongside the `name`.

Now, something to consider: as we have seen before, `onchange` methods are only called when we modify one of their dependencies through the UI, as `onchange` methods are triggered through JavaScript. This means that, if at any point we create a new `eagle.property` record through XML or Python, the `age` will not be set as it is set through an `onchange` method.
To circumvent this, we can set the value of the age field directly by calling the `onchange` method manually in the `create` method.