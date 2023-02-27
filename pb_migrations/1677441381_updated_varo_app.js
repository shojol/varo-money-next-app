migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "riggct4i",
    "name": "productName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dp94wqbp",
    "name": "productId",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "riggct4i",
    "name": "product_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dp94wqbp",
    "name": "product_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
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

  // update
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
})
