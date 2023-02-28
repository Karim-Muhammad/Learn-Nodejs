const express = require('express');
const path = require('path'); // built-in module
const app = express();

app.set('view engine', 'ejs'); // without it, it will throw (no engine default to use and no extension provided)
app.set('views', 'views'); // default is views folder

// app.use(express.static(path.join(__dirname, 'static'))); // this is will return middleware, so we should run this middleware for each route
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
   console.log("Home Page");
   console.log(req.query.name, req.query.age);
   res.render('index')
})

app.post('/', (req, res)=> {
   const body = req.body;
   res.render('index', {uname: body.username})
})
// Routing Parameter
app.get('/:name', (req, res) => {
   res.end(req.params.name);
})
// Why use it? Because we can use it to create dynamic route
// app.get('/user/:name', (req, res) => {})
// we use to render same template with different data depend on the route parameter

// one thing else
// You have to write the route with parameter at the bottom(last) the route
// after all route that has same parent route
// because express will check from top to bottom

// Query Params ?key=value
// When you want to pass data to the server
// you have two options (PUT, POST||GET)
// POST method, will pass the data to the server without appear in the URL
// PUT or GET method, will pass the data to the server with appear in the URL as Query Params

app.listen(3000, ()=> {
   console.log('Server is running on port 3000')
});
