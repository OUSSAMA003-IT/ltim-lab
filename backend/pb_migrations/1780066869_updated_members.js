/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3572739349")

  // add field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "file347571224",
    "maxSelect": 0,
    "maxSize": 0,
    "mimeTypes": null,
    "name": "photo",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3572739349")

  // remove field
  collection.fields.removeById("file347571224")

  return app.save(collection)
})
