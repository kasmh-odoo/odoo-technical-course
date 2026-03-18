# Eagle Estates - Addendum (Translations)

### To-Do's
- Add an `i18n` folder in the `Eagle Estates` app.
- Export translation files for **Spanish (es)** language.

Once done, the file structure of the module should look like this:
```text
eagle_estates
├── i18n
│   └── es.po
└── ...
```

The `es.po` file should more or less look like the following (might be different based on your version of Odoo):
```text
# Translation of Odoo Server.
# This file contains the translation of the following modules:
# 	* eagle_estates
# 
msgid ""
msgstr ""
"Project-Id-Version: Odoo Server 15.0\n"
"Language-Team: Spanish (https://app.transifex.com/odoo/teams/41243/es/)\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: \n"
"Language: es\n"
"Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;\n"

#. module: eagle_estates
#: model:ir.model.fields,help:eagle_estates.field_eagle_property__name
msgid "Name"
msgstr "Nombre"
```

Obviously the file should have more translatable strings, as the example above only shows translation for the `Name` field. of the `eagle.property` model.