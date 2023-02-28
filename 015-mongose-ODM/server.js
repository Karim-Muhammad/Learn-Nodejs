const express = require("express");
const path = require("path"); // built-in module
const MongoClient = require("mongodb").MongoClient;

const DoMongo = require("./models/same_mongo");

const app = express();

app.set("view engine", "ejs"); // without it, it will throw (no engine default to use and no extension provided)
app.set("views", "views"); // default is views folder

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const body = req.body;
  /**
 *   MongoClient.connect("mongodb://127.0.0.1:27017/train_users")
    .then(async (client) => {
      try {
        console.log("MongoDB is Connected");
        const db = client.db();

        let all = "";
        await db
          .collection("users")
          .insertOne({ ...body })
          .then((result) => {
            console.log(result);

            // all = db.collection("users").find();
            // res.render("index", { uname: all[0].username });
          });

        // const all = db.collection("users").find(); // error, insert method async, so we need to use then() method
        // console.log(all);
      } finally {
        client.close();
      }
    })
    .catch((err) => {
      console.log("~~~ Error ~~~ ", err);
    });
 */
  DoMongo("train_users", async (db) => {
    await db.collection("users").insertOne({ ...body });
  });
  res.render("index", { uname: body.username });
});
// Routing Parameter
app.get("/:name", (req, res) => {
  res.end(req.params.name);
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
