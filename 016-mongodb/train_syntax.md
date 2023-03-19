##### insert documents in a collection(users)

```js
db.users.insertMany([
  { userId: 1, fName: "Karim", lName: "Muhammad", age: 20 },
  { userId: 2, fName: "Omar", lName: "Muhammad", age: 20 },
  { userId: 3, fName: "Murad", lName: "Zeyad", age: 22 },
]);
```

##### to show all collections now

```js
show collections;
> admin
> config
> local
> users
```

##### to show all documents in a collection

```js
db.users.find({});
> { "_id" : ObjectId("5f9b1b1b8b1b1b1b1b1b1b1b"), "userId" : 1, "fName" : "Karim", "lName" : "Muhammad", "age" : 20 }
> { "_id" : ObjectId("5f9b1b1b8b1b1b1b1b1b1b1c"), "userId" : 2, "fName" : "Omar", "lName" : "Muhammad", "age" : 20 }
> { "_id" : ObjectId("5f9b1b1b8b1b1b1b1b1b1b1d"), "userId" : 3, "fName" : "Murad", "lName" : "Zeyad", "age" : 22 }
```

##### to show all documents in a collection in a pretty way

```js
db.users.find({age: 22}).pretty();
> {
> 	"_id" : ObjectId("5f9b1b1b8b1b1b1b1b1b1b1b"),
> 	"userId" : 1,
> 	"fName" : "Murad",
> 	"lName" : "Zeyad",
> 	"age" : 22
> }
```

##### find() take two arguments

- query (what to find)
- projection (what fields to show)

```js
db.users.find({ age: { $gt: 20 } }, { fName: 1, age: 1 }); // fName: 1 means show fName field, age: 1 means show age field
```

##### to show all documents in a collection in a pretty way

```js
db.users.find({ age: { $gt: 20 } }, { fName: 1, age: 1 }).pretty();
```

##### count() method to count the number of documents in a collection

```js
db.users
  .find({ age: { $gt: 20 } }, { fName: 1, age: 1 })
  .pretty()
  .count();
```

_WATCHOUT_

```js
db.users.updateOne({ fName: "Karim" }, { salary: 4000 });
```

> this will delete all the fields in the document and add only the salary field
> whole document will be overrided with 'salary' field only!
> **SOLUTION**, You Should use Update Operator $set, $inc, ...etc.

```js
db.users.updateOne({ fName: "Karim" }, { $set: { salary: 4000 } });
```

> this will add the salary field to the document

```js
db.users.updateOne({ fName: "Karim" }, { $inc: { salary: 4000 } });
```

> this will increment the salary field by 4000

```js
db.users.updateOne(
  { fName: "Karim" },
  { $inc: { salary: 4000 }, $set: { age: 30 } }
);
```

> this will increment the salary field by 4000 and set the age field to 30

#### What is Query Data in MongoDB?

- Query data in MongoDB is the process of retrieving data from a collection in MongoDB.

```js
db.users.find({}).skip(1); // skip the first document
db.users.find({}).limit(1); // get the first document
db.users.find({}).sort({ age: 1 });
// 1 means ascending order
// -1 means descending order
```

if we want sort based on multiple fields?

```js
db.users.find({}).sort({ age: 1, fName: -1 });
> this will sort based on age first then fName
```

if we want count the number of documents in a collection?

```js
db.users.find({}).count();
```
