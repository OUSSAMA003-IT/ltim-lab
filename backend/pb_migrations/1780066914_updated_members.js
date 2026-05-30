/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3572739349")

  // add field
  collection.fields.addAt(4, new Field({
    "convertURLs": false,
    "help": "",
    "hidden": false,
    "id": "editor3709889147",
    "maxSize": 0,
    "name": "bio",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3572739349")

  // remove field
  collection.fields.removeById("editor3709889147")

  return app.save(collection)
})
