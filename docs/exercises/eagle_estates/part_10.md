# Eagle Estates - Part 10

Now that we have explored the topics of Context and Domains, let's add the following changes to our app:

- Let's add a `parent_id` field on our properties, that will reference the same model, `eagle.property`. The logic here
  is that properties can be linked to parent properties; think of appartments linked to a building, or a house linked
  to a compound. In these examples, the Building/Compound is the parent, and the Appartment/House is the child.
- Also add a `child_ids` field to keep track of child properties on the parent properties
- Create a new window action linked to the **Properties** model, with the name **Units**.
  - This action should have a **domain** that allows us to only display properties that **have a parent**, i.e: **Apartments/Houses**
- Update the original properties action with the name **Compounds**
  - This action should have a **domain** that allows us to only display properties that **do not have a parent**, i.e: **Compounds/Buildings**
- Update the existing **Properties** menuitem to not link to any action, and add two new menu items that point to 
  our **Compounds** and **Units** actions, and have **Properties** as a parent
- Using the context, update the **Compounds** and **Units** actions to set a default value for the **Name** field: "New Compound" or "New Unit" respectively