// Dynamic Files
// how to setup ejs template engine
// how to use ejs template engine
// how to send data to ejs template engine
// how to use ejs template engine with express
// (https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application)

const express = require('express');
const path = require('path'); // built-in module

const app = express();

// app.set('view engine', 'ejs'); // set view engine
// what is set method does? it will set a value for a key


// app.set('views', 'views'); // set views folder
// you should determine the views folder, because by default it will look for views folder in the root directory.
// by default the value of views folder is views, so we don't need to set it, but if we want to change the name of views folder, we should set it.
// (https://stackoverflow.com/questions/25229129/what-app-set-function-does-express-js)
app.use(express.static(path.join(__dirname, 'static'))); // this is will return middleware, so we should run this middleware for each route


app.get('/', (req, res) => {
   console.log("Home Page");

   // res.sendFile(path.join(process.cwd(), 'views', 'index.ejs'), {uname: 'karim'}); // 
   // res.render(path.join(process.cwd(), 'views', 'index.ejs'), {uname: 'karim'}); // 
   
   // res.render('index');
   // res.end("heloo"); 
})

app.post('/', (req, res)=> {
   const body = req.body;
   res.render('index', {uname: body.username})
})
 
app.listen(3000, ()=> {
   console.log('Server is running on port 3000')
});


// What is 304 status code?
// https://www.hostinger.com/tutorials/304-status-code#:~:text=The%20HTTP%20status%20code%20304,page%20in%20your%20local%20storage.
// (https://www.google.com/search?q=304+status+code&oq=304+status+code&aqs=chrome..69i57.5383j0j1&sourceid=chrome&ie=UTF-8)