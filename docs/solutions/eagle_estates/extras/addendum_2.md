# Eagle Estates - Addendum 2 (Portal)

### To-Do's
- Add a new boolean field on properties to allow them to be published on the portal: `is_published`.
- Inherit the `portal.mixin` abstract model on `eagle.property`
- Define/Override methods on the `CustomerPortal` controller class
- Define/Override templates used to render properties on the portal

### Model Changes
Add a field on `eagle.property`:
```python
is_published = fields.Boolean(string="Published on Portal", default=False)
```

Inherit `portal.mixin` on `eagle.property` and override the `_compute_access_url` method:
```python
class EagleProperty(models.Model):
    _name = 'eagle.property'
    _inherit = ['portal.mixin']
    
    ...

    def _compute_access_url(self):
        super()._compute_access_url()
        for record in self:
            record.access_url = '/my/properties/%s' % record.id

```

### Controllers

Let's define our EagleEstates Controller class and import all of the libraries/collections we'll be using later on

```python
from collections import OrderedDict
from odoo.addons.portal.controllers.portal import CustomerPortal, pager as portal_pager, _
from odoo.http import request, route
from odoo.exceptions import AccessError, MissingError
from odoo.osv.expression import AND


class EagleEstates(CustomerPortal):
    ...

```

Remember, to add a link on the portal home page accessible via `/my`, we need to override
the `_prepare_home_portal_values` method:

```python
class EagleEstates(CustomerPortal):

    def _get_properties_portal_domain(self):
        return [
            ('is_published', '=', True)
        ]

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        if 'properties_count' in counters:
            # Here, 'properties_count' should be added from the XML template that
            # was overridden previously: portal_my_home_properties
            domain = self._get_properties_portal_domain()
            values['properties_count'] = request.env['eagle.property'].sudo().search_count(domain)
        return values
```

Next, we need to define two route methods:
    -   portal_my_properties: route accessed when browsing `/my/properties`
    -   portal_my_property: route accessed when browsing `/my/property/<ID>`

Let's start with `portal_my_properties`:

```python
class EagleEstates(CustomerPortal):
    ...

    @route(['/my/properties', '/my/properties/page/<int:page>'], type='http', auth="user", website=True)
    def portal_my_properties(self, page=1, date_begin=None, date_end=None, sortby=None, filterby=None, **kw):
        # First, we get the initial values required for the portal layout
        # This includes: sales_user & page_name
        values = self._prepare_portal_layout_values()
        # We defined a method that returns the domain applied when fetching properties for the portal
        domain = self._get_properties_portal_domain()
        EagleProperty = request.env['eagle.property']
        # On the list view of published properties, we want to allow the user to sort and filter the properties
        # based on pre-defined options. We define these options in the following dictionaries.
        # - searchbar_sortings for the sorting options
        searchbar_sortings = {
            'construction_date': {'label': _('Construction Date'), 'order': 'construction_date desc'},
            'surface': {'label': _('Surface Area'), 'order': 'surface desc'},
        }
        # - searchbar_filters for the filtering options
        searchbar_filters = {
            'all': {'label': _('All'), 'domain': []},
            'invoices': {'label': _('Compounds'), 'domain': [('parent_id', '=', False)]},
            'bills': {'label': _('Units'), 'domain': [('parent_id', '!=', False)]},
        }
        # default sort by order
        if not sortby:
            sortby = 'construction_date'
        order = searchbar_sortings[sortby]['order']
        # default filter by value
        if not filterby:
            filterby = 'all'
        domain += searchbar_filters[filterby]['domain']
        if date_begin and date_end:
            domain += [('create_date', '>', date_begin), ('create_date', '<=', date_end)]
        # Prepare the pager values for pagination
        pager = portal_pager(
            url="/my/properties",
            url_args={'date_begin': date_begin, 'date_end': date_end, 'sortby': sortby, 'filterby': filterby},
            total=EagleProperty.search_count(domain),
            page=page,
            step=self._items_per_page
        )
        # Search the properties that will be printed on the web page
        properties = EagleProperty.search(domain, order=order, limit=self._items_per_page, offset=pager['offset'])
        request.session['my_properties_history'] = properties.ids[:100]
        # Update the values dict
        values.update({
            'date': date_begin,
            'properties': properties,
            'page_name': 'property',
            'pager': pager,
            'default_url': "/my/properties",
            'searchbar_sortings': searchbar_sortings,
            'searchbar_filters': OrderedDict(sorted(searchbar_filters.items())),
            'sortby': sortby,
            'filterby': filterby,
        })
        # Once we have prepared all the required values, we then render the QWeb template
        return request.render("eagle_estates.portal_my_properties", values)

```
Now, let's work on `portal_my_property`:

```python
class EagleEstates(CustomerPortal):
    ...

    @route('/my/properties/<int:property_id>', type='http', auth="user", website=True)
    def portal_my_property(self, property_id, access_token=None, **kw):
        try:
            # First, we fetch the property
            property_sudo = self._document_check_access('eagle.property', property_id, access_token)
        except (AccessError, MissingError):
            # If the user does not have access to the property, we redirect them to `/my`
            return request.redirect('/my')
        # We prepare the values that will be passed on to the QWeb template for rendering
        values = {
            'page_name': 'property',
            'property_id': property_sudo,
        }
        values = self._get_page_view_values(
            property_sudo, access_token, values, 'my_properties_history', False, **kw
        )
        # Finally, we render the template
        return request.render("eagle_estates.portal_my_property", values)
```

With this, oure Controller class should be ready to go. Now let's work on the templates

### Templates

First, let's add a link to our properties on the `/my` portal home page. This is done by inheriting `portal.portal_my_home` and adding a new element inside `div` with class `o_portal_docs`. It's important that the element we add is defined by calling the `portal.portal_docs_entry` subtemplate as that will do most of the heavy lifting:

```xml
<!-- Define the template that will show on the `/my` portal home page -->
<template id="portal_my_home_properties" name="Show Properties" inherit_id="portal.portal_my_home" 
          customize_show="True" priority="30">
    <xpath expr="//div[hasclass('o_portal_docs')]" position="inside">
        <t t-call="portal.portal_docs_entry">
            <t t-set="icon" t-value="'/sale/static/src/img/bag.svg'"/>
            <t t-set="bg_color" t-value="'alert alert-primary'"/>
            <t t-set="show_count" t-value="True"/>
            <t t-set="text">Check published Properties</t>
            <t t-set="title">Published Properties</t>
            <t t-set="url" t-value="'/my/properties'"/>
            <t t-set="placeholder_count" t-value="'properties_count'"/>
        </t>
    </xpath>
</template>
```

Next, let's define the template that will be used to render our list of properties. Make sure to call the `portal.portal_layout` layout:

```xml
<template id="portal_my_properties" name="My Properties">
    <t t-call="portal.portal_layout">
        <t t-set="breadcrumbs_searchbar" t-value="True"/>

        <t t-call="portal.portal_searchbar">
            <t t-set="title">Properties</t>
        </t>
        <t t-if="not properties">
            <p class="alert alert-warning">There are currently no published properties.</p>
        </t>
        <t t-if="properties" t-call="portal.portal_table">
            <thead>
                <tr class="active">
                    <th>Property</th>
                    <th>Construction Date</th>
                    <th>Surface</th>
                </tr>
            </thead>
            <tbody>
                <t t-foreach="properties" t-as="prop">
                    <tr>
                        <td>
                            <a t-att-href="prop.get_portal_url()" t-att-title="prop.name" t-out="prop.name" />
                        </td>
                        <td><span t-field="prop.construction_date"/></td>
                        <td><span t-field="prop.surface"/></td>
                    </tr>
                </t>
            </tbody>
        </t>
    </t>
</template>
```

Finally, let's add the template for the detailed property view by inheriting `portal.portal_sidebar`. Important: Make sure to mark your new template as `primary="True"`, otherwise you would be modifying the original template directly, which is not what we want:
```xml
<template id="portal_my_property" name="My Property" inherit_id="portal.portal_sidebar" primary="True">
    <xpath expr="//div[hasclass('o_portal_sidebar')]" position="inside">
        <h1 t-field="property_id.name" />
        <div role="alert" class="alert alert-info">
            <h4>Property Details</h4>
            <p>
                Content for the property goes here!
            </p>
        </div>
    </xpath>
</template>

```

That's it! Now our portal should be setup and ready!

Check out the code at:
[Eagle Estates - Addendum 2](https://github.com/mebe-odoo/eagle-estates/tree/Addendum-2)