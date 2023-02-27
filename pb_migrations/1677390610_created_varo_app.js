migrate((db) => {
  const collection = new Collection({
    "id": "nd7v4rzi7ilzdpw",
    "created": "2023-02-26 05:50:10.083Z",
    "updated": "2023-02-26 05:50:10.083Z",
    "name": "varo_app",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nd7v4rzi7ilzdpw");

  return dao.deleteCollection(collection);
})
