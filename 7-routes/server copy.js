const express = require('express');
const app = express();

app.all('/', (req, res, next)=> {
   console.log('Home Page');
   res.send("Home Page")
})


app.all('*', (req, res, next)=> {
   console.log('all general')
   res.status(404).send("404 Page Not Found");
})


app.listen(3000, ()=> {
   console.log("Server is running on port 3000");
})
