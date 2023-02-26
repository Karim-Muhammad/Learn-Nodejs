there is field mongo give us for make document is a unique in its collection.

in another collection is there is a document has a same unqiue id(rare), it is ok.

<!--  -->

you don't repeat MongoClient.connect each time you want use database
you should create folder for `models` and create file for each operation CRUD, and use it as module, and each time you want do something in database, you invoke these function that exist in module

<!--  -->

#### Create

```js
const DoMongo = (databaseName, callback) => {
  MongoClient.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(async (client) => {
      try {
        await callback(client.db());
      } catch (err) {
        console.log("~~~ Error in executing commands ~~~ ", err);
      } finally {
        client.close();
      }
    })
    .catch((err) => {
      console.log("~~~ Error in connection of database ~~~ ", err);
    });
};
```

> you use `insertOne({})` or `insertMany([{},{}])`, to create document in collection

<!--  -->

#### Read

```js

```

> you use `find()` to retrive the document of collection, but since collection may contains huge number is document, so it couldn't return all document, because this will cost memory, it will return something called `Crusor` and contains some of `documents` not all
> and to return `Array` of documents instead of `Cursor`, you can use `toArray()` method, and this method `<promise>`, or accept `callback function` as parameter, as we know in case Mongodb functionalities
