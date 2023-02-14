const http = require('http');

const server = http.createServer((req, res)=> {
     // res.setHeader('Content-Type', 'text/html');
     res.setHeader('Content-Type', 'application/json');
     // 
     console.log("Request Headers", req.headers);
     console.log("Response Headers", res.headers);
     // 
     console.log(req.url +'\t');
     // 
     if(req.url === '/') res.write("Hello From Home");
     else if (req.url === '/about') res.write('Hello From About');
     else if (req.url === '/contact') res.write('Contact Form');
     else res.write("404 Not Found");
     // 
     // res.write("Hello to my Website");
     // res.write("add this line again");
     // 
     res.end();
});

server.listen(3000, ()=> console.log("Server is Running on port 3000"));