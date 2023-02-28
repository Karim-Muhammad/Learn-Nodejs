```js
const express = require('express');
const body = require('body/form');
const bodyParser = require('body-parser');

const app = express();

```
### Body Parser
> It is not used for inputs of files (like upload, download whatever...), if you used that, it will give your information of these files not file itself.

There are another module called 'multer' to handle files, and it's more powerful than body-parser.

but in case you dealing with plain text or array or object, you can use body||body-parser.

##### how array?
> if you have input with name='hobbies' and you have multiple inputs with same name, then you will get array of values.
> or checkboxes that have same name but different values, then you will get array of values.

###### We can use these instructions to parse coming data
```js
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
```
> __that will run for each incoming requests, not for specific route.__

##### Some Questions:
__NOTE: what is that means .urlencoded()?__
> it means that we can parse data that comes from 'form' (not json data) because when we send data from form, it will be encoded in url format.

__NOTE: what is that means .json()?__
> it means that we can parse json data.

__NOTE: what is that means `extended: true`?__
> it means that we can parse nested objects, and arrays.
> if we set it to `false`, we can't parse nested objects, and arrays.

> also that means something else, if `true` that means use package called `qs` to parse data.
> if `false` that means use package called 'querystring' to parse data.

> read `qs` package(Awesome Package) in npm (https://www.npmjs.com/package/qs#readme)

##### question now, what is difference between these two packages (querystring, qs)?
> `qs` is more powerful, and more flexible, but `querystring` is more simple, and more efficient.
> `querystring` is built-in package, and `qs` is not built-in package, so we need to install it.
> `querystring` is faster than qs, but `qs` is __more powerful__ than `querystring` (_because it has some Security stuff_).
> so that `qs` is __more secure__ than `querystring`.

to know more, [read this](https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0)
read this too [link](https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar)

```js
app.get('/', (req, res)=> {
   res.setHeader('Content-Type', 'text/html');

   res.write('<form action="/" method="POST">');
   res.write('<input type="text" name="username" />');
   res.write('<input type="text" name="message" />');
   res.write('<input type="submit" value="send" />');
   res.write('</form>');

   res.end();
})
```
_Here we do get request route, and return `form` html with `action="/"` and ``method="POST"`_ 


___as we know___, we can pass multiple middlewares to express, and each middleware will be executed __in order__.
```js
app.post('/', bodyParser.urlencoded({extended: true}), (req, res)=> {
   console.log(req.body); // undefined (without body|body-parser module)
   
   // body(req, res, (err, body)=> {
   // (in case we didnt bodyParser middleware)
   //    console.log(body);
   // })
   
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
```

so we could pass _multiple middlewares_ to express, and each middleware will be executed __in order__.
but __next middlewares__ will _run only if first middleware call `next()` function._

```js
app.get('/show', (req, res, next)=> {console.log("Hello"); next()}, (req, res, next)=> console.log("World"))

// NOTE: we have to pass 'body-parser' middleware first of all(top level) or first passing, for our comming middleware could use body of request after parsing
app.listen(3000, ()=> {
   console.log('Server is running on port 3000');
})
```