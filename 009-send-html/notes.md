some resources

read more about `body-parser`
https://expressjs.com/en/resources/middleware/body-parser.html

What is Readable stream
https://nodesource.com/blog/understanding-streams-in-nodejs/

What is difference between `Buffer` and `Stream`
https://medium.com/developers-arena/streams-and-buffers-in-nodejs-30ff53edd50f
https://www.quora.com/What-is-the-difference-between-buffer-and-stream

What is Chunks?
https://www.tutorialspoint.com/data-chunks-in-node-js#:~:text=Side%20ProgrammingProgramming-,Data%20chunks%20in%20Node.,then%20converted%20into%20meaningful%20data.

How server receiving chunks of data from browser?
or How browser send the data as chunks to server?
i don't know if this article related with this question or not XD
[article1](https://support.hpe.com/hpesc/public/docDisplay?docId=ns100.0.13281521.2722624en_us&docLocale=en_US)
[article2](https://bunny.net/academy/http/what-is-chunked-encoding/)

What is Header `Keep-Alive`?
https://www.imperva.com/learn/performance/http-keep-alive/

```js
   req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);

   });
   req.on('end', () => {
      // when server this last chunk? it see unique id of this chunk, and its Headers, and see that this is the last chunk.
      console.log(req.body); // undefined (without body|body-parser module)
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      res.end('OK');
   }) 

```
```
req.on('data', chunk => {
   console.log(chunk);
   body.push(chunk);
});

```
> this means server `keep alive`, and open, and browser send to server data until end
> and our server listen to these data, and execute this function when receive data.

there are many methods that do actions on our requests, one of them `.on()`
when receive data, you receive it in chunks, not all at once


##### Why receiving or sending data in chunks?
> Because it's _more efficient_, you don't have to wait for all the data to be received before you can start processing it.
> _You can start processing it as soon as you receive it._

##### But what if the data is too big?
> You can set a limit to the size of the data you can receive.
> also another problem, if some error _occurs(corruption of data)_, all data will be lost.

So, when we are receiving data in chunks, also sending data in chunks, so if some chunks lost brwoser will ask for it again(Conncetion is open) - depend on type of protocol-

because each chunks has a unique id, this *number/flag* identify server if there are some chunks still didn't get it, because previous chunks has a header refer to next expected chunk, so if this header was empty or special number, server now knows this last chunk (Listen to Network Course XD)

all these chunks stored in `Buffer`(no `Stream`? search), which is a special array, that stores data in binary format.

##### What is Buffer?
Buffer is a global object, so we don't need to require it.
specially when we are working with Files that stored in streams, we are working with buffers.

when we store files in memory, we store them in streams. and streams stored in buffers.

[read that](https://www.quora.com/What-is-the-difference-between-buffer-and-stream)
[article about streams](https://nodesource.com/blog/understanding-streams-in-nodejs/)


```js
req.on('end', () => {
   // when server this last chunk? it see unique id of this chunk, and its Headers, and see that this is the last chunk.
   console.log(req.body); // undefined (without body| module)
   const parsedBody = Buffer.concat(body).toString();
   console.log(parsedBody);
   res.end('OK');
}) 
```
> _final received body is: username=ahmed&message=hello as string, but we want to get it as object. to extract the data, and use it in our application._
   you can do function and pass this string to convert it to object.
   **OR** you can use a library that do this for you, like module is called 'body' (npm install body)
   and you can use it like this:
```js
const body = require('body');
body(req, res, (err, body) => {
   console.log(body); // username=ahmed&message=hello (final as string)
   // like previous example no difference!
   // so what different?
   // use require('body/form') to make body object not string
})
```
> we use this set of codes instead of req.on('data') and req.on('end')
> When you use express, you will use another module is called 'body-parser' (npm install body-parser)

`Buffer.concat()` is a method that we can use to _concatenate all the chunks of buffers into one object buffer._

then we can convert it to specific format, the formatting based on how you receivied data.

if these chunks of files content, then you should format it to string (toString).
if these chunks of images, then you should format it to image.(blob, binary)
[need resource!]()

// in our case, we are receiving data from `input` text, so we should convert it to string.

lesson (post request, time: 8:48)




Don't Forget: most of functions that we call are callback, it listen to specific event, and will be executed when the event is fired.
