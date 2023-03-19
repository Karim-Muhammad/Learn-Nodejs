// Constants
const PORT = 3000;

// ----------------------------------------------------------------------
const express = require("express");
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

// create express app
const app = express();

// for serving static files
app.use(express.static("assets")); // for static files that not change
app.use(express.static("images")); // for images that will be uploaded by users(like profile picture), so it is dynamic
// you can use "assets" in both cases, but it is not a good practice

// Import Routes
const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");


// Setting Template Engine
app.set("view engine", "ejs");
app.set("views", "views");

// for parsing application/json, routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRouter);
app.use("/product", productRouter);

// to listen on the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
