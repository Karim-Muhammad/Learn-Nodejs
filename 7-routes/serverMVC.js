const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');
// console.log(userRouter);

app.use('/user', userRouter);
// one of benefits using `.use()` in this case, in case we have more children in this route
// /user/courses | /user/sign-up | ...
// 

app.all('*', (req, res, next)=> {
   console.log('all general')
   res.status(404).send("404 Page Not Found");
})


app.listen(3000, ()=> {
   console.log("Server is running on port 3000");
})
