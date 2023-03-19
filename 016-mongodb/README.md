### What is NoSQL? and what is difference between it and SQL?

NoSQL is more flexible and scalable -horizental scaling in precise- and that is so helpful benefit we can get from it.
NoSQL allows us to make each instance is varying from another instance, may one of them has 2 fields and one another has 4 fields!
NoSQL is semi-structured database, and used in ECommerece, Trading, Blogs Application
NoSQL is not a database, it is a group of database, and each one of them has its own features and advantages.
NoSQL uses JSON format to store data, and it is very easy to understand and use.
NoSQL based on key-value pair, and it is very easy to search for a specific key.
NoSQL provides high performance and high availability.
NoSQL provide for us nested documents, and it works similar a little bit as a relational database. (Joins)
NoSQL has 2 types of approaches you can follow:
[read more](https://www.mongodb.com/nosql-explained/nosql-vs-sql)
[read more2](https://www.ibm.com/cloud/blog/sql-vs-nosql)
[read more3](https://www.coursera.org/articles/nosql-vs-sql)

---

#### There are other 5 Types

[1] Document-Oriented Approach
[2] Column-Oriented Approach
[3] Graph-Oriented Approach
[4] Key-Value Approach
[read more](https://www.mongodb.com/scale/types-of-nosql-databases)

---

#### MongoDB provides 2 types of Data model

1. Embeded Data Model
2. Normalized Data Model

[learn more](https://www.tutorialspoint.com/mongodb/mongodb_data_modeling.htm#:~:text=MongoDB%20provides%20two%20types%20of%20data%20models%3A%20%E2%80%94,either%20of%20the%20models%20while%20preparing%20your%20document.)
[learn more](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)

> relationship in mongodb [learn more](https://www.educba.com/mongodb-relationships/)

##### Embeded Data Model in MongoDB (Denormalized Data Model| Fast Querying)

[read](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding)

1. You can have embed all related data in a single document.
2. capture all relationship between the data by storing them in a single document.
3. knwon as denormalized data model.
4. it possible to embed documents in arrays, and it is very useful when you have a list of related data.

##### Normalized Data Model in MongoDB

[read](https://www.mongodb.com/docs/manual/core/data-model-design/#normalized-data-models)

1. you can refer the sub documents in the original document, using reference.

---

#### When you should use Embeded Data Model? (one-to-one relationship, one-to-many relationship)

- embeding provides better read performance operations, as well as abilities to to request and retieve all related data in a single query.
- embeded data models make it possible tp update related data in a single atomic write operations.

> in this case you make document for one-to-one relationship, and one-to-many relationship.

#### When you should use Normalized Data Model? (many-to-many relationship)

- when embeding would cause duplication of data, but would not provide sufficient reads performance.
- to more complex represent many-to-many relationships.
- to model large hierarchiel data sets.

> in this case you make document for many-to-many relationship, and one-to-many relationship.

---

#### Terms in SQL, and MongoDB

| SQL         | MongoDB                            |
| ----------- | ---------------------------------- |
| Database    | Database                           |
| Table       | Collection                         |
| Row         | BSON Document                      |
| Column      | BSON Field                         |
| Table Join  | Embedded Documents                 |
| Primary Key | Primary Key (\_id: <ObjectId101>)  |
| Foreign Key | Foreign Key (empID: 'ObjectId101') |
| Join        | Embeding and linking $lookup       |
| Group By    | Aggregations                       |
| Index       | Indexe                             |

---

###### Collection

- A collection is a group of MongoDB documents. It is the equivalent of an RDBMS table.
- A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection are of similar or related purpose.

###### Document

- A document is a set of key-value pairs. Documents have dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data.
- represent a single record in a MongoDB collection. Documents are the basic unit of data(Entity)s in MongoDB. Documents are analogous to JSON objects.
- Documents can contains embedded subdocuments(document)
- Documents stored as BSON(Binary JSON) format, which is lightweight and efficient form of JSON.

###### BSON

- BSON is a binary-encoded serialization of JSON-like documents. BSON extends the JSON model to provide additional data types and to be more efficient for encoding and decoding.

###### Field

- A field is a key in a document. A field's value can be any of the BSON data types.

###### Index

- An index is a data structure that improves the speed of read operations in a collection. MongoDB supports secondary indexes, which store a subset of the collection's data set in an ordered structure optimized for efficient access. The index stores the value of a specific field or set of fields, ordered by the value of the field. The ordering of the index entries supports efficient equality matches and range-based query operations.

###### Primary Key

- A primary key is a unique identifier for a document. The primary key is used to identify a document when updating or deleting it. The primary key is also used to specify relationships between documents in different collections.
- MongoDB automatically creates a unique index on the \_id field of each document in a collection. The \_id field is the primary key for the document.
- The \_id field is a _`12-byte` BSON ObjectId value_. The ObjectId value consists of: a 4-byte timestamp value, a 5-byte random value, and a 3-byte incrementing counter.
- The \_id field is required for all documents. If you do not specify a value for the \_id field when you insert a document, MongoDB automatically generates a unique ObjectId value for the \_id field.

###### Foreign Key

- A foreign key is a field (or set of fields) in one document that refers to the \_id field of another document. The \_id field is the primary key for the referenced document. Foreign keys are used to establish relationships between documents in different collections.
- MongoDB does not enforce foreign key constraints on document relationships. You must enforce the relationship between documents at the application level.
- The foreign key is a field in the referencing document that contains the \_id value of the referenced document. The foreign key can be a single field or an array of fields.

###### Join

- A join operation combines fields from two or more documents into a single document. MongoDB provides the `$lookup` stage to perform `joins` between collections _in the same database_ and the `$graphLookup` stage to perform joins between collections _in the same database or in other databases._

###### Group By

- The aggregation framework provides the `$group` stage to group input documents by a specified identifier expression and apply the accumulator expression(s), if specified, to each group. The `_id` field of each output document contains the unique group by value. The output documents can also contain computed fields that hold the values of some accumulator expression grouped by the group by expression value.
- The `$group` stage is the first stage in the _aggregation pipeline_ and must be the first stage in the pipeline. The `$group` stage can **only be used once per aggregation pipeline**.

###### Aggregation

- The aggregation framework provides a powerful and flexible way to process data and return computed results. The aggregation framework is modeled on the _concept of data processing pipelines_. Documents enter a multi-stage pipeline that transforms the documents into an aggregated result.

`aggregate()` method
`mapreduce()` method
`db.collection.group()` method

---

#### Basic Commands For MongoDB Shell

---

[NoSQL](https://www.mongodb.com/databases/types)

---

###### What is Pipline? Aggregation Pipeline? [read](https://docs.mongodb.com/manual/core/aggregation-pipeline/)

<!--  -->
<!--  -->
---

###### What is Aggregation Framework? [read](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
<!--  -->
<!--  -->

---

##### Read Operations
```js
db.collection.find(
    { <query> },
    { <projection> }
)

db.users.find(
    {age: {$gt: 20}},
    {name: 1, age: 1}
)
```
> what is means projection? that's means you can select the fields you want to see.

