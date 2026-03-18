# Eagle Estates - Part 14

For any apartment and house, we should be able to view the room count as well as the list of rooms. A user-friendly way
to visualize this is to add a smart button on the form view of `eagle.property`.

Another change that can be done is to add a button called *Create Room* in the header of the form view. As a result, we
will disable creation of `eagle.property.room` records from its views.

- Add an integer field to the `eagle.property` model.
- Add a compute method for the field to compute the number of rooms.
- Remove the `room_ids` field that was previously placed in the form view.
- Add a smart button to the form view of `eagle.property`. This button should be visible only if there is at least 1
  room.
- While the smart button displays the room count, clicking on it should open a list view of the rooms.
- Add a button in the form view's header and give the label _Create Room_. When clicked, the form view
  of `eagle.property.room` should appear.
- Disable creation of `eagle.property.room` records from its views.
