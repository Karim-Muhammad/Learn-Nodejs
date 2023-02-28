const express = require("express");
const favicon = require("serve-favicon");
const path = require("path"); // built-in module
const { ObjectId } = require("mongodb");

const DoMongo = require("./models/same_mongo");

const app = express();

app.set("view engine", "ejs"); // without it, it will throw (no engine default to use and no extension provided)
app.set("views", "views"); // default is views folder
console.log(path.join(__dirname, "static"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
// app.use("/favicon.ico", (req, res) => res.end());

// --------------------FavIcon--------------------
app.use(favicon(path.join(__dirname, "static", "favicon.ico")));

// --------------------FavIcon--------------------

app.get("/", (req, res) => {
  DoMongo("train_users", async (db) => {
    let all = [];
    await db
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        console.log(users);
        all = users;
      });
    console.log(all);
    res.render("index", {
      uname: all?.length > 0 ? all[all.length - 1]?.username : "",
      members: all,
    });
  });
});

app.get("/filter", (req, res) => {
  DoMongo("train_users", async (db) => {
    let all = [];
    // Aggregation Pipeline Operations
    // find({<filter query>}, {<Options>})

    // Filter Query
    // $gt, $lt, $gte, $lte, $ne, $in, $nin, $exists, $type, $mod, $regex, $text, $where
    // $and, $or, $not, $nor

    // $or: [{age: 20}, {age: 30}]
    // means age = 20 or age = 30
    // $and: [{age: 20}, {username: "a"}]
    // means age = 20 and username = "a"
    // $not: {age: 20}
    // means age != 20

    // Options
    // limit, skip, sort, projection
    // sort({<field>: <value>, <field>: <value>})
    // or sort([<field>, <value>], [<field>, <value>]) // <value> = 1-> ascending, -1-> descending

    // find({}, {limit: 2}) or find().limit(2) // means limit 2 documents
    // you can use options as method chaining or object parameter

    // find({}, {skip: 2}) or find().skip(2) // means skip 2 documents

    // sort({age: 1, username: -1})
    // means sort by age ascending, _then_ sort by username descending

    await db
      .collection("users")
      .find(
        {
          age: {
            $gt: 20,
            $lt: 30,
            $gte: 25,
            $lte: 20,
            $ne: 25,
            $in: [20, 30, 40],
            $nin: [10, 6, 02],
            $exists: true,
            $type: "string",
            $mod: [2, 0],
            $regex: /a/,
            $text: "a",
            $where: function () {
              return this.age > 20;
            },
          },
        },
        { limit: 2, skip: 2 }
      )
      .skip(2)
      .sort({ age: 1, username: -1 })
      .toArray()
      .then((users) => {
        console.log(users);
        all = users;
      });
    console.log(all);
    res.render("index", {
      uname: all?.length > 0 ? all[all.length - 1]?.username : "",
      members: all,
    });
  });
});

app.post("/", (req, res) => {
  const body = req.body;
  DoMongo("train_users", async (db) => {
    await db.collection("users").insertOne({ ...body });
    /* ------------------- await db.collection('users').find() ------------------ */
  });
  // res.end("You Post the Data Successfully");
  res.redirect("/");
});
// Routing Parameter

app.use("/search", (req, res) => {
  console.log(req.query.age);
  DoMongo("train_users", async (db) => {
    let all = [];
    await db
      .collection("users")
      .find({ age: req.query.age })
      .toArray()
      .then((res) => {
        all = res;
      });
    res.render("index", { uname: "", members: all });
  });
});
// .use(), because, in this route we will use query params /search?age=20

// Get one user and render it in another page
app.get("/user/:id", (req, res) => {
  DoMongo("train_users", async (db) => {
    let member = {};
    /**
    await db
      .collection("users")
      .find({ _id: new ObjectId(req.params.id) })
      .toArray()
      .then((result) => {
        member = result[0];
      });
     */

    // use findOne() method instead of find() method + toArray() method
    // find() method return cursor, and we need to use toArray() method to convert it to array
    // findOne() method return void, in case we pass callback a parameter, and it will return promise if we didn't
    await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        member = result;
      });
    res.render("one", { member });
  });
});

app.get("/updateUser", (req, res, next) => {
  console.log("--------Updating User-----------");

  DoMongo("train_users", async (db) => {
    const { oldName, ...body } = req.query;
    // You cannot use `req.body` here, because it's a GET request
    // in case you want to use `req.body` you need to use `req.body` in POST request

    console.log(req.query);
    await db
      .collection("users")
      .updateOne({ username: oldName }, { $set: { ...body } })
      .then((result) => {
        console.log("Updated ", result);
        res.redirect("/");
      });
  });
});

app.get("/deleteUser", (req, res, next) => {
  console.log("--------Deleting User-----------");
  DoMongo("train_users", async (db) => {
    await db
      .collection("users")
      .deleteOne({ username: req.query.username })
      .then((result) => {
        console.log("User Deleted");
        res.redirect("/");
      });
  });
});

// Redirect to another page
app.get("to-gome", (req, res, next) => {
  console.log("Redirecting to home page");
  res.redirect("/");
  // you can use full path url
  // res.redirect('http://localhost:3000');
  // or use relative path to current url
  // res.redirect('./');
  // or use relative path to root / url
  // res.redirect('/about'); // this will redirect to root
  res.redirect(302, "/"); // status code first then url or path or url then status code(deprecated)
  // status code 302 is redirect
});

app.get("/:name", (req, res) => {
  res.end(req.params.name);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
