# Eagle Estates - Part 4

### To-Do's
- Add two menu items using `<menuitem>` element below the view records.
- Use nesting to create the submenu.

### Notes
- For root menus, have the word 'root' as a naming convention e.g. `menu_eagle_estates_root`.
- Root menus, or menus without any parent, appear on the apps selection screen.

If the menu items are added correctly, we should have the following XML code:
```xml
<menuitem id="menu_eagle_estates_root" name="Eagle Estates">
    <menuitem id="menu_eagle_estates_properties" name="Properties" sequence="10"/>
</menuitem>
```
