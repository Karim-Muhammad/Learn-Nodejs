const { MongoClient } = require("mongodb");

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
module.exports = DoMongo;
