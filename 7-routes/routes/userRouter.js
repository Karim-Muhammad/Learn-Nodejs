const express = require('express');
const app = express();

app.all('/', (req, res, next)=> {
   console.log("Welcome to User Dashboard");
   res.send("Welcome to User Dashboard");
})

app.all('/about', (req, res, next)=> {
   console.log("Welcome to User About");
   res.send("Welcome to User About");
})

app.all('/courses', (req, res, next)=> {
   console.log("Welcome to User Courses");
   res.send("Welcome to User Courses");
})