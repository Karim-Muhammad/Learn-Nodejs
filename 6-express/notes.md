with express we create 'express application' that has all configuration for backend.

```js
const express = require('express')
// this module return a function
// when you invoke/call it returns 'express application';
const app = express();
```
When we dealing with `http` module we was createServer and pass to it one callback function that has 2 parameters `request`, `response` this callback was be fired when user do request to server, and you can do some actions and return the particular `response` based on specific fields in `request` object, you could so routes based on `url` property that exist in `request` but that was not practical, right.

here an `express` you create express application, and `express` be built on something called `Middleware` that like `software, hardware`, it is is some logic/function has been fired when requests start sending

for example there is middleware is called `body-parser` this module fires function when requests is sending to checks on `Content-Type` Field that exist in `request`

```js
const express = require('express');
const app = express();

app.use((req, res, next)=> {

   console.log("Middleware 1");
   console.log(req.path);
   
   // console.log('Request received', req);
   // console.log("Response", res);
   // console.log("Next", next);

   /*
   res.write('hello');
   res.end();
   */

   //   see 70 line
   res.send('Website is under construction');
   next();
   // next(); // next is used to move to the next middleware
   // next() function allow us to do something after the middleware is done
   // next() function help us to determine middleware order/chain

})
```

#### Why Middleware runs twice?
> When the browser sends a request to the server, it also sends a request for the favicon. The browser sends a request for the favicon to the server.[Read this article](https://stackoverflow.com/questions/34863034/why-is-my-middleware-executed-twice#:~:text=The%20reason%20why%20your%20middleware,that%20doesn't%20exist).

```js
app.use((req, res, next)=> {
   // it will execute only if previous middleware uses `next()` function
   
   console.log("Middleware 2"); 
   console.log(req.path); 
   next();
})
```
##### Hints
- middleware runs in order
- middleware is a function that has access to the request and response object
- middleware can be used to check if a user is logged In
- middleware can be used to check if a user has a valid token
- middleware can be used to check if a user has a valid role
- middleware can be used to check if a user has a valid permission
- middleware runs for each request
---
- we can use `app.use()` once time or multiple times
- we can use `app.use()` for all HTTP methods or specific HTTP methods
- we can use `app.use()` for all routes or specific routes
- we can pass multiple middleware functions to one `app.use()`


```js
app.use((req, res, next)=> {
   console.log('first middleware');
   // next(); // if we don't call next() function, the second middleware will not run
   // so you need to call next() function to move on the next middleware
   next();
}, (req, res, next)=> {
   console.log('second middleware');
   next();
});
```

```js
app.use('/api', (req, res, next)=> {console.log(req.path); next();})
```
> this middleware will run only for the routes that start with `/api`
> so that very helpful, and help us for create some program(middleware) for example everything related to `/api` routes
> we use use `/user` or `/product`, so on

#### Question: What is the difference between `app.use()` and `app.get()`, `app.post()`, `app.put()`, `app.delete()`?
> [Answer] is that `app.use()` runs for all HTTP methods, but `app.get()`, `app.post()`, `app.put()`, `app.delete()` runs for specific HTTP methods
---
#### Question: What is the difference between `res.write()` and `res.send()`?
> [Answer] is that `res.write()` is used to write a response, but `res.send()` is used to send a response

##### Hints
- in `res.write` you type your response, but you need to call `res.end()` to send the response
- in `res.send` you type your response and it will send the response automatically
- default `res.send` content-type is `text/html`
- `res.send()` can send a string, object, array, number, boolean, null, undefined, buffer, stream, and promise
- `res.send()` can send a JSON object
- `res.send()` can send a HTML file
- `res.send()` can send a JSON file
---
- and `res.write()` can send a string, buffer, and stream
- `res.write()` can send a JSON object
- default `res.write()` content-type is `text/plain`

you should call `res.send()` only once, because you can't send a response twice
you can call `res.write()` multiple times, because you you have to end the response by calling `res.end()` and you can't end the response twice

when we return a response, `write`, `send`, `end` they write a body of response, also they write a status code and a content-type(Headers)

hence you cannot send a response twice, because you can't set headers twice and you can't set status code twice, because first one it sent to browser and finished

This is ***common mistake*** that we call `res.send` multiple times in one route
so we should call `res.send()` only once in one route

*take care of this mistake*

```js
app.listen(3000, ()=> {
   console.log('Server is running on port 3000');
})
```