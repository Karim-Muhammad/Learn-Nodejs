const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const path = require("path"); // built-in module

const dbURL = "mongodb://127.0.0.1:27017/train2_users_mongoose";

// const { ObjectId } = require("mongodb");
// const DoMongo = require("./models/same_mongo");

const app = express();
mongoose.set("strictQuery", false); // to allow query like {age: {$gt: 20, $lt: 30}}') and to avoid
const Schema = new mongoose.Schema({
  username: String,
  job: String,
  age: Number,
});

const Users = mongoose.model("user", Schema);

app.set("view engine", "ejs"); // without it, it will throw (no engine default to use and no extension provided)
app.set("views", "views"); // default is views folder

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// --------------------FavIcon--------------------
app.use(favicon(path.join(__dirname, "static", "favicon.ico")));

// --------------------FavIcon--------------------

app.get("/", (req, res) => {
  mongoose.connect(dbURL, (err) => {
    if (err) console.log("Error in connecting to database");
    else {
      // you can use _id: "5f9e1b9e1b9e1b9e1b9e1b9e" as string, not must be ObjectId, as we saw in mongodb
      Users.find({}, (err, users) => {
        res.render("index", { uname: users.at(-1)?.username, members: users });
      });
    }
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
  mongoose.connect(dbURL, { useNewUrlParser: true }, (err) => {
    const new_user = new Users(body);
    new_user.save((err) => {
      if (err) console.log(err);
      else console.log("User saved successfully");
    });
  });
  res.redirect("/");
});
// Routing Parameter

app.use("/search", (req, res) => {
  console.log(req.query.age);
  mongoose.connect("mongodb://127.0.0.1:27017/train2_users_mongoose", (err) => {
    Users.find(req.query, (err, users) => {
      res.render("index", { uname: "", members: users });
      mongoose.disconnect();
    });

    // or
    // const searchedUsers = Users.find(req.query).toArray()
  });
});
// .use(), because, in this route we will use query params /search?age=20

// Get one user and render it in another page
app.get("/user/:id", (req, res) => {
  mongoose.connect(dbURL, (err) => {
    Users.findById(req.params.id, (err, user) => {
      res.render("one", { member: user });
    });
  });
});

app.get("/updateUser", (req, res, next) => {
  console.log("--------Updating User-----------");
  const { oldName, ...body } = req.query;
  console.log(req.query);

  mongoose.connect(dbURL, (err) => {
    Users.updateOne({ username: oldName }, body).then((user) => {
      console.log("User updated successfully", user);
    });
    res.redirect("/");
  });

  // you have another way to update
  // you can receive the object user and then modify it properties as a object
  // user.age = 20; user.username = "a"; ...etc
  // at the end you should save it
  // user.save((err, res)=> {...});
});

app.get("/deleteUser/:id", (req, res, next) => {
  console.log("--------Deleting User-----------");
  mongoose.connect(dbURL, (err) => {
    Users.deleteOne({ _id: req.params.id }, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
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
