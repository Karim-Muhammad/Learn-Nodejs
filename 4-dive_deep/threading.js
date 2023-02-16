const crypto = require('crypto');
const pbkdf2 = crypto.pbkdf2;

// process.env.UV_THREADPOOL_SIZE = 2; //to determine number of thread operating system will handling
// default number of threads the `Libuv` provide 4 threads
const start = Date.now();

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("1: " , (Date.now() - start)); // 2s
})

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("2: ", Date.now() - start); // 4s(single thread) ? no,2s(b. multi-th)
})

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("3: ", Date.now() - start);
})

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("4: ", Date.now() - start);
})

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("5: ", Date.now() - start);
})

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("6: ", Date.now() - start);
})

pbkdf2('pass', 'salt', 100000, 5, 'sha512', _=> {
     console.log("7: ", Date.now() - start);
})