const request = require('http').request;
const start = Date.now();

// Event Loop algorithm
while(is_callstack_empty) {
     // tick()
}

request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();
request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();
request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();
request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();
request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();
request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();
request('http://localhost:3000', (res)=> {
     res.on('data', _=> console.log("data"));
     res.on('end', _=> console.log(Date.now() - start));
}).end();

// 7 requests take almost same time, amazing!