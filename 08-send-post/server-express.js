const express = require('express');
const app = express();
const body = require('body/form');
// 
const bodyParser = require('body-parser');
// not used for inputs of files (like upload, download whatever...), if you used that, it will give your information of these files not file itself
// there are another module called 'multer' to handle files, and it's more powerful than body-parser

// but in case you dealing with plain text or array or object, you can use body||body-parser
// how array? if you have input with name='hobbies' and you have multiple inputs with same name, then you will get array of values.
// or checkboxes that have same name but different values, then you will get array of values.

// we can use these instructions
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// that will run for each incoming requests, not for specific route.

// NOTE: what is that means .urlencoded()?

// it means that we can parse data that comes from 'form' (not json data)
// because when we send data from form, it will be encoded in url format.

// NOTE: what is that means .json()?
// it means that we can parse json data.

// NOTE: what is that means 'extended: true'?
// it means that we can parse nested objects, and arrays.
// if we set it to false, we can't parse nested objects, and arrays.
// also that means something else, if `true` that means use package called 'qs` to parse data.
// if `false` that means use package called 'querystring' to parse data.

// question now, what is difference between these two packages?
// > qs is more powerful, and more flexible, but querystring is more simple, and more efficient.
// > querystring is built-in package, and qs is not built-in package, so we need to install it.
// > querystring is faster than qs, but qs is more powerful than querystring (becakse it has some Security stuff).
// so that qs is more secure than querystring.

// to know more, read this (https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0)
// to know more, read this (https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar)

app.get('/', (req, res)=> {
   res.setHeader('Content-Type', 'text/html');

   res.write('<form action="/" method="POST">');
   res.write('<input type="text" name="username" />');
   res.write('<input type="text" name="message" />');
   res.write('<input type="submit" value="send" />');
   res.write('</form>');

   res.end();
})

// as we know, we can pass multiple middlewares to express, and each middleware will be executed in order.
app.post('/', bodyParser.urlencoded({extended: true}), (req, res)=> {
   console.log(req.body); // undefined (without body|body-parser module)
   body(req, res, (err, body)=> {
      console.log(body);
   })
   // you can do the same things that we did in case 'http' module.
   // express doesn't change http modules at all, it just add more things to ease to you
   
   // but in our case, if we using express, we don't need to use body module, because express has body-parser module.
   // body-parser module is a middleware, it's a function that will be executed before the request reach to the route handler.
   // so we can use body-parser module to parse the body of the request.
   // we can use body-parser module to parse the body of the request.
   // Don't forget 'express' built in Middleware Concept

   // what does middleware do?
   // it fire each request and parse the data that comes from 'form' and convert it to object, and then store it in 'body' header in request
   res.end('OK')
})

// so we could pass multiple middlewares to express, and each middleware will be executed in order.
// but next middlewares will run only if first middleware call next() function.
app.get('/show', (req, res, next)=> {console.log("Hello"); next()}, (req, res, next)=> console.log("World"))

// NOTE: we have to pass 'body-parser' middleware first of all(top level) or first passing, for our comming middleware could use body of request after parsing
app.listen(3000, ()=> {
   console.log('Server is running on port 3000');
})