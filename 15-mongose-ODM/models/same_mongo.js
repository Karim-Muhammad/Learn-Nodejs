const mongoose = require("mongoose");

const DoMongose = (databaseName, callback) => {
  // const Schema = mongoose.Schema(schema);
  // const collection = mongoose.model(collectionName, Schema);

  // model retiurns a constructor function to create a document with the given schema for the given collection
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
      userNewUrlParser: true,
    })
    .then(async () => {
      try {
        await callback();
      } catch (err) {
        console.log("~~~ Error in executing commands ~~~ ", err);
      } finally {
        mongoose.disconnect();
      }
    })
    .catch((err) => {
      console.log("~~~ Error in connection of database ~~~ ", err);
    });
};
module.exports = DoMongose;
