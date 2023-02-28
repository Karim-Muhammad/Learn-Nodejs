to install Mongodb you should create folder in `C` and it should be called 'data' and within it should contain another folder called 'db'


you can change this path of folder by this command
`mongod --dbpath "<path>"`

you should remember the `port` of mongodb because this you will use it to connect your app with the database

` sudo systemctl enable mongod`
to enable mongod server
` sudo systemctl restart mongod`
to restart the database server
` sudo systemctl status mongod`
to check state of server
`mongosh`
to run mongodb shell

` sudo nano /etc/mongod.conf`
to configure the configuration of server by this file

` mongosh  "mongodb://adminuser@mongo-ip-address:27017"`
to run adminstrator privilage

[read this resource](https://www.cherryservers.com/blog/how-to-install-and-start-using-mongodb-on-ubuntu-20-04)

<!--  Start   -->
you store all information on form `document` that's look like exactly Javascript Object or JSON

and collection of these Objects is called `Collection` and `Collections` represent the `database`

SO

each information is a document | object
collection of documents is called collection
collection of collections is called database

<!--  -->
It's not neccessary the all fields of document are the same.
it maybe some documents contains fields and other doesn't.

that's not like `SQL`(Structure Query Language), that all your data is based on the `tables` you created, `NoSQL` is more flexiable, you can add additional fields or less.


In Fact MongoDB uses something called `BSON`(Binary JSON) not `JSON`, WHY `BSON`, because as we know `JSON` at the end is Object but when you receive it from backend or file or whatever, you get it as String

`BSON` is JSON but represented in Binary, for ease DBMS, Databse to do operations on Documents and our data

<!--  -->
##### How to Connect our Node App with Mongo Database?
> BY Mongodb Driver, You Should install it `npm -i mongodb`

_Hint_, Connection between Node APP and Mongodb consume huge resources of device, so don't stay connection always is opened between node app and database, just when we need it, open it

<!--  -->
Princple
Any method related to mongo has two types:
1. method takes callback function
2. method return the promise, in case you didn't pass it the callback

```js
MongoClient.connect('mongodb://localhost:27017', (err, res)=>{})
MongoClient.connect('mongodb://localhost:27017') // return a promise
// hence you can use `.then()`, `.catch()`
MongoClient.connect('mongodb://localhost:27017').then().catch();
```

<!--  -->

Server can server multiple databases, not only one
to deal with database in mongo in Nodejs
```js
MongoClient.connect('mongodb://127.0.0.1:27017')
   .then(client => {
      console.log('MongoDB is Connected')
      const db = client.db('databaseName'); // not exist? create it auto!
      // this statment return the methods that you ,will use it to do operation on this database, so store it in variable, conventient 'db' variable
   })
   .catch(err => {console.log(err)});
```

<!-- Another Way -->
```js
MongoClient.connect('mongodb://127.0.0.1:27017/databaseName')
   .then(client => {
      console.log('MongoDB is Connected')
      const db = client.db(); // not exist? create it auto!
      // now you use it in url

      client.close(); // you should, because connection consume huge resuources
})
   .catch(err => {console.log(err)});
```

When to use first way and second?
First Way use it when you use one database in application
Second way use it when you use nultiple databases in application