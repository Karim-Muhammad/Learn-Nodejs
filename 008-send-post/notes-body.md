> we use 'body' module in this file, to parse data the we received from request.

```js
const http = require('http');
// const body = require('body');
const body = require('body/form');

const server = http.createServer((req, res)=> {
   // req is an object from type Readable Stream
   if(req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html');

      res.write('<form action="/" method="POST">');
      res.write('<input type="text" name="username" />');
      res.write('<input type="text" name="message" />');
      res.write('<input type="submit" value="send" />');
      res.write('</form>');

      res.end();
   } else if (req.method==='POST') {
      body(req, res, (err, body)=> {
         // console.log(req, res);
         console.log("The Body")
         console.log(body);
         // same output that we get from Buffer.concat(body).toString()
         // but we don't need to use Buffer, and concat, and toString.
         // body module do all these things for us.
         // so what difference between Buffer and body?
         // body module has another packages that we can use to parse data.
         // there is package for json, if browser send json, or 'form' package for user send data from 'form'

         res.end('OK')
      })
   }
})

// most of functions that we call are callback, it listen to specific event, and will be executed when the event is fired.
server.listen(3000, ()=> {
   console.log("Server is running on port 3000");
})
```

in this file we tried to use one package called `body`, `body` is a function
```js
body(req, res, (error, body)=> {
   // code
   console.log(body) // name='karim'&age='21' (as a string)
}) 
```
but this package contains some internal packages that can make us can extract final object that contains all information that user posted from `form` html