const http = require('http');
const body = require('body');

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
      const body = [];
      // on is a method that we can use to listen to events
      req.on('data', chunk => {
         // this means server keep alive, and open, and browser send to server data until end
         // and our server listen to these data, and execute this function when receive data.
         
         // there are many methods that do actions on our requests
         // when receive data, you receive it in chunks, not all at once
         console.log(chunk);
         body.push(chunk);

         // Why receiving or sending data in chunks?
         // Because it's more efficient, you don't have to wait for all the data to be received before you can start processing it.
         // You can start processing it as soon as you receive it.
         
         // But what if the data is too big? You can set a limit to the size of the data you can receive.
         // also another problem, if some error occurs(corruption of data), all data will be lost.

         // So, we receiving data in chunks, but and sending data in chunks, to if some chunks lost brwoser will ask for it again.
         // because each chunks has a unique id. (Network Course)
         
         // all these chunks stored in Buffer, which is a special array, that stores data in binary format.
         // Buffer is a global object, so we don't need to require it.
         // specially when we are working with Files that stored in streams, we are working with buffers.
         // when we store files in memory, we store them in streams. and streams stored in buffers.
         
         // read that [https://www.quora.com/What-is-the-difference-between-buffer-and-stream]
         // [article about streams] [https://nodesource.com/blog/understanding-streams-in-nodejs/]
      });
      req.on('end', () => {
         // when server this last chunk? it see unique id of this chunk, and its Headers, and see that this is the last chunk.
         console.log(req.body); // undefined (without body| module)
         const parsedBody = Buffer.concat(body).toString();
         // Buffer.concat() is a method that we can use to concatenate all the chunks of buffers into one object buffer.
         // then we can convert it to specific format, the formatting based on how you receivied data.
         // if these chunks of files content, then you should format it to string (toString).
         // if these chunks of images, then you should format it to image.

         // in our case, we are receiving data in string format, so we should convert it to string.
         // lesson (post request, time: 8:48)
         console.log(parsedBody);
         res.end('OK');
      }) 
      
      // final received body is: username=ahmed&message=hello as string, but we want to get it as object. to extract the data.
      // and use it in our application.

      // you can do function and pass this string to convert it to object.
      // or you can use a library that do this for you, like module is called 'body' (npm install body)
      // and you can use it like this:
      
      // const body = require('body');
      // body(req, (err, body) => {
      //    console.log(body);
      // })
      
      // we use this set of codes instead of req.on('data') and req.on('end')

      // When you use express, you will use another module is called 'body-parser' (npm install body-parser)
   }
})

// most of functions that we call are callback, it listen to specific event, and will be executed when the event is fired.
server.listen(3000, ()=> {
   console.log("Server is running on port 3000");
})