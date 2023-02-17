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