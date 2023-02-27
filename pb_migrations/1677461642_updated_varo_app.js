migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubih6lqu",
    "name": "image",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubih6lqu",
    "name": "productImg",
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

  return dao.saveCollection(collection)
})
