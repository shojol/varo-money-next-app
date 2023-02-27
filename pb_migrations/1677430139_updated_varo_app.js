migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubih6lqu",
    "name": "product_img",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "image/tiff",
        "image/svg+xml"
      ],
      "thumbs": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mef4wpwo",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjneu22w",
    "name": "product_category",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "category a",
        "category b",
        "category c"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // remove
  collection.schema.removeField("ubih6lqu")

  // remove
  collection.schema.removeField("mef4wpwo")

  // remove
  collection.schema.removeField("fjneu22w")

  return dao.saveCollection(collection)
})
