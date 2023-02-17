In this Lesson, we will learn how to respond specific response based on current url that we in, that is called 'routing', you send response depend on your url/route


```
localhost:3000/
localhost:3000/about
localhost:3000/:id
localhost:3000/:slug
localhost:3000/:uuid

> http://localhost is domain
> after that is `routes`(static or dynamic:)
```

___server[MVC].js___

```js
const express = require('express');
const app = express();


app.use((req, res, next)=> {
   if(req.url === '/') res.send('Welcome to Home');
   else if (req.url === '/about') res.send('Welcome to About Page');
   else if (req.url === '/contact') res.send('Welcome to Contact Page');
   else if (req.url === '/help') res.send('Welcome to Help Page');
   else res.send('404 Page Not Found');
})

```
> here in every request you execute this middleware 
> here we can use the above code but it is not a good practice


**we can use the below code to make it more efficient**
> we can execute the middleware only when the request is for the *specific url*
> we can tell express execute this callback/middleware only in specific route 
see the below code

```js
app.use('/', (req, res, next)=> {
   console.log('Home Page');
   res.send("Home Page")
   // next();
})
// equiv but there difference
app.all('/', (req, res, next)=> {
   console.log('Home Page');
   res.send("Home Page")
   // next();
})
```

```js
app.use('/about', (req, res, next)=> {
   console.log('About Page');
   res.send("About Page")
   // next();
})
```

here we face a problem that, if we go to `/about` url, it will still show the *home page*, but if we used `next()` in the above code, it will execute the next middleware(`app.use('/about')`), but we don't want to execute the next middleware, we want to execute the next middleware only when the request is for the specific url
so we can use the below code
```js
app.all('/about', (req, res, next)=> {
   res.send('About Page');
})
```

**express** provide another method like `use()` that run also for every requests, but the difference is that run in exact url, not where url "start with" like `use()`

so `all()` method will run *only when url match exact these routes*, unlike `use()` method that run *when url of page start with any of these routes* so if we i go to `/product` it will also run middleware of `/` , why? because `/products` start with `/` as well and this *route of home* so it will execute it, and you can also execute middleware that own product routes by using `next()` in the home middleware, but you will face the ***common problem*** that _send multiple response_, so you maybe should use `write()` instead of `send()` in the `home` middleware

also, there is another difference, `all()` `should determine`(optional) the route string, but `use()` can determine the route string or not, if you don't determine the route string it will run for every request

why? because as we said `all()` it has to _match url of page with exactly of defined route string_ to works as expected, but `use()` it hasn't to match exact routes string.

so if we need middleware that work with *404 Page Not Found*, we should use `use()` method, because concept of 404 that access routes that is not defined in our server, so we should work with method that works for every request and not strict matching routes string

in fact, there is a way(we can use `all()` method) to make 404 page not found with `all()` method, it it will work like this:

```js
app.all('*', (req, res, next)=> { res.status(404).send("404 Page Not Found"); })
// determine route is called "*" that means any route
```
> but it is not a good practice, because we can use `use()` method to make 404 page not found, and it is more efficient

so if we accessed some random url, like /no and i use `use(callback)` it will execute the callback, but if i use `all(callback)` it will not execute the callback, because it has to match exactly the route string, but `use()` it doesn't have to match exactly the route string, so it will execute the callback

```js
app.use('/help', (req, res, next)=> {
   res.send("Help Page")
})
```
> these above code like we did in first middleware, but instead of using `if else` and checking `req.url` we are using `app.use(route, middleware)` and express will match the url/route and execute the middleware, if we use `app.use()` without any url it will execute for every request


we put our routes before middleware, because as we know, we can add multiple middleware in one route `app.use()`

so how we execute some middleware in case 404 error
we can use the below code


```js
app.use((req, res, next)=> {
   res.status(404).send("404 Page Not Found");
})
// Equivalent to
app.use('*',(req, res, next)=> {
   res.status(404).send("404 Page Not Found");
})
```

> without this code, if we go to any url which is not defined, it will show blank page
> note: without determining any routes string, it will execute for every request

```js
app.all('*', (req, res, next)=> {
   console.log('all general')
   res.status(404).send("404 Page Not Found");
})
```

why`.all()` is called like this? because it means all requests methods (GET, POST, PUT, DELETE, etc...).

so if we use `.all()` it will execute for every request method, but if we use `.get()` it will execute only for GET request method, and if we use `.post()` it will execute only for POST request method, and so on...
app.all('/all', (req, res, next)=> {
   if(req.method === 'GET') res.send('GET Request');
   else if (req.method === 'POST') res.send('POST Request');
   else if (req.method === 'PUT') res.send('PUT Request');
   else if (req.method === 'DELETE') res.send('DELETE Request');
   else res.send('404 Page Not Found');
})

express also ease our works, we can use `app.get()` instead of `app.all()` and `app.post()` instead of `app.all()`

so we can use the below code

```js
app.get('/all', (req, res, next)=> {
   res.send('GET Request');
})
```

in case this syntax, we did like this, we did 2 if conditions, one for GET request and one for route url. if method === 'GET' && path === '/all' within or `app.all()` -  `app.use()`

```js
app.post('/all', (req, res, next)=> {
   res.send('POST Request');
})
```

// so on

```js
app.listen(3000, ()=> {
   console.log("Server is running on port 3000");
})
```


// video 2: Express Router time 9:00

>
   summary:
   if we want use all routes that related to user, then we should use 
   `app.use('/user', userRouter)` for like authentication, authorization, and other routes that related to user

   if we want just run one middleware for specific route, then we should use `app.all('/user', userRouter)`
   or `app.get('/user', userRouter)`
   or `app.post('/user', userRouter)`
   or `app.put('/user', userRouter)`, etc...

How to make good structure for our project? how to split our folders and codes to suitable folders
we advice to make 3 folders, one for routes, one for controllers, and one for models

express has two types of middleware, one is application level middleware, and one is router level middleware
application level middleware is like `app.use()` and `app.all()`, and router level middleware is like `router.use()` and `router.all()`
so we can use `app.use()` and `app.all()` in our app.js file, and we can use `router.use()` and `router.all()` in our routes files

----
<small>./routes/userRouter.js<small>
Middleware: userRouter.js
Middleware Router Level

```js
const router = require('express').Router();
```
> what is return from this statment, Middleware function that pass to `app.use()` or `app.all()` or `router.use()` or `router.routerall()`


__note__, we use `router` instead of `app` because we want to use this middleware in specific route, not all routes.
so we use `router` instead of `app` to use this middleware in specific route.

> if we used `router.use('/')` instead `router.all('/')`  will cause some logic error in case this route has children,
> so advice: use `.use()` in case this routes has more children routes and in another file like <type>Router.js, and use `.all()` in case this route has no children routes, because it will match it exactly.

```js
router.all('/', (req, res, next)=> {
   // you can try add 'a' for example in this url, and explore what happens
   console.log("Welcome to User Dashboard");
   res.send("Welcome to User Dashboard");
})

router.all('/about', (req, res, next)=> {
   console.log("Welcome to User About");
   res.send("Welcome to User About");
})

router.all('/courses', (req, res, next)=> {
   console.log("Welcome to User Courses");
   res.send("Welcome to User Courses");
})

// router.use('/auth', userController.authUser);

module.exports = router;


// exports = router; // this cause error.
// you can check this in serverMVC.js file and print what you imported in this file.

// console.log(module.exports) // will print router middleware function in case solution, and in case wrong way, it will print empty object

// console.log(exports)// print print router moddileware function in case wrong way, and in case solution way, print empty object(opposite to module.exports)
```

#### Let's explain what is router middleware level
> How we pass this router as middleware function in serverMVC.js file? we know we fire specific middleware function in specific route
> but here what this `router` middleware function do exactly? i didn't write in logic within it!
> Yeah, you're right, we didn't write any logic in it, the logic implemented abstractly in `express.Router()` function, all `.use`, `.all` that we call it in `router` is another middleware function.

log the router middleware function, and you will see what i mean
```js
console.log(router);
```

> you will find, each `.all` or `.use` you use it with `router` express creates something is called `layer` and it is object property has `handle`, `regex` and many else, `regex` is the exact route(url) that you defined. and `handle` is middleware function that associated with this route.

> and the question here, how `userRouter.js` is middleware function? it has so many layers that associated with specific route with thier handles, so how this `userRouter` is running? with abstracted way.



> revision video express routing in time 19:00