const express = require("express");
const path = require("path"); // built-in module
const MongoClient = require("mongodb").MongoClient;

const app = express();

MongoClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    console.log("MongoDB is Connected");
    const db = client.db("firstDB");
    // you won't see the database in the mongodb compass until you create a collection
    // you can create a collection by using the below code
    // db.collection('users').insertOne({name: 'Mohamed', age: 20})

    client.close(); // to avoid memory leak, and consume less memory
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs"); // without it, it will throw (no engine default to use and no extension provided)
app.set("views", "views"); // default is views folder

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Home Page");
  console.log(req.query); // when you write ?name=xyz in url
  res.render("index");
});

app.post("/", (req, res) => {
  const body = req.body;
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
