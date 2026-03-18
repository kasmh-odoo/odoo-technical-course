# Eagle Estates - Part 9

Let's add the following features to our app:

- Add a `street`, `zip`, `city`, `state_id` and `country_id` fields on the Properties model. 
  You can take inspiration from the `res.partner` model
- Add the same fields on the **Rooms** model, but make them related to the fields defined on the related property
- Add a `construction_date` field on the rooms, should be related to the property's `construction_date`
- Add an `age` field on the property, should be set whenever the `construction_date` changes/is set
  - You can either do this through a compute field, or an onchange function
- Make the `area` field on the **Properties** computed (stored), taking the **sum** of the area of all the rooms
- Add an **SQL constraint** to make sure no two properties have the same name
- Add an `api.constrains` to make sure the `construction_date` is not in the future