migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjneu22w",
    "name": "productCategory",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "a",
        "b",
        "c"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjneu22w",
    "name": "productCategory",
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
})
