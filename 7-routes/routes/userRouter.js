// Middleware: userRouter.js
// Middleware Router Level

const router = require('express').Router();
// what is return from this statment, Middleware function that pass to `app.use()` or `app.all()` or `router.use()` or `router.routerall()`


// note, we use `router` instead of `app` because we want to use this middleware in specific route, not all routes
// so we use `router` instead of `app` to use this middleware in specific route
// if we used .use('/), will cause some error

// so advice: use `.use()` in case this routes has more children routes and in another file like <type>Router.js, and use `.all()` in case this route has no children routes, because it will match it exactly.

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


// #### Let's explain what is router middleware level
// How we pass this router as middleware function in serverMVC.js file? we know we fire specific middleware function in specific route
// but here what this `router` middleware function do exactly? i didn't write in logic within it!
// Yeah, you're right, we didn't write any logic in it, the logic implemented abstractly in `express.Router()` function, all `.use`, `.all` that we call it in `router` is another middleware function.

// log the router middleware function, and you will see what i mean
// console.log(router);

// you will find, each `.all` or `.use` you use it with `router` express creates something is called `layer` and it is object property has `handle`, `regex` and many else, `regex` is the exact route(url) that you defined. and `handle` is middleware function that associated with this route.

// and the question here, how `userRouter.js` is middleware function? it has so many layers that associated with specific route with thier handles, so how this `userRouter` is running? with abstracted way.


// revision video express routing in time 19:00