const http = require('http');

const server = http.createServer((req, res)=> {
     // res.setHeader('Content-Type', 'text/html');
     // res.setHeader('Content-Type', 'application/json');
     // console.log("Request Headers", req.headers);
     console.log(req.url +'\t');
     if(req.url === '/') res.write("Hello From Home");
     res.end();
});

server.listen(3000, ()=> console.log("Server is Running on port 3000"));