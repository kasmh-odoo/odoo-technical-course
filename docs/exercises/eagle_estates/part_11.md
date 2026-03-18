# Eagle Estates - Part 11

Having a grasp of Magic Numbers and Commands gives us a good understanding of data can be set for One2many and Many2many fields,
to further understand this, let's apply the following changes to our module:

Let's create some data that will be used alongside our app:


### Tags:
Add a new `eagle_tag_data.xml` file in the `data` folder, that will define tags with the following names:
  - Residential
  - Commercial 

### Properties:
Add a new `eagle_property_data.xml` file in the `data` folder, that will define properties with the following data:
  - **Property 1 (Apartment 217)**
    - Name: "Apartment 217"
    - Construction Date: 2009-10-01
  - **Property 2 (Apartment 9905)**
    - Name: "Apartment 9905"
    - Construction Date: 2010-04-24
  - **Property 3 (Burj Khalifa)**
    - Name: "Burj Khalifa"
    - Construction Date: 2009-10-01
    - Address:
      - Street: "1 Sheikh Mohammed bin Rashid Blvd"
      - Zip: "00000"
      - City: "Dubai"
      - State: "Dubai"
      - Country: "United Arab Emirates"

### Link Properties & Tags:
Using Magic Numbers/Commands, link the properties to the tags as follows:
  - **Property 1 (Apartment 217)**
    - Tags: Residential
  - **Property 2 (Apartment 9905)**
    - Tags: Residential
  - **Property 3 (Burj Khalifa)**
    - Tags: Residential, Commercial

Also link child properties to their parent property using Magic Numbers/Commands, as follows:
  - **Property 3 (Burj Khalifa)**
    - Child Properties: Property 1 (Apartment 217), Property 2 (Apartment 9905)