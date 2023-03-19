// Constants
const DB_URL = "online-shop";

// Packages
const mongoose = require("mongoose");

// Functionality
const DoMongo = async (databaseName, callback) => {

    let promise;
  
    await mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      try {

        console.log("Promise is : ", promise);
        promise = await callback();
        console.log("Promise is : ", promise);

      } catch (err) {
        
        console.log("Execution of callback went wrong! - ", err);
      
    } finally {
    
        mongoose.disconnect();
        console.log(promise)
        return promise;
    
    }
    })
    .catch((er) => {
    
        console.log("Connecting of database went wrong! - ", er);
    
    });
};

module.exports = DoMongo;
