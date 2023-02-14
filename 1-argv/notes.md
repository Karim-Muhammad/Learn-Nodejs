###### There are many things that exist in Browser but doesn't exist here in nodejs (runtime env).

instead of `window` in javascript is `global` in nodejs
instead of `document` in javascript is `process` in nodejs

<!--  -->
#### Command Line Arguments > argv
How to accept a input(stdin) from user in nodejs?
in browser we were take value of input tag html and then do operation
so how we do same in nodejs?
> by command line!

when we type `node app.js`
we typed arguments to command line, each argument separated with space
> [node, app.js]

then command line do operation based on first argument that is program which will execute and other arguments will be arguments/parameters in the program

in our case `node` is program 'node.exe' and `app.js` argument that will passed to `node` program to do his work (compile our code)

try this code
```js
console.log(process.argv)
```

```cmd
node app.js 1 2
```

it will output all argument that you will passed to command line
based on it, you can do some operation too on these arguments

these what be doing in `node.exe` program.
when you type just `node` it will execute `node.exe` and make terminal like a editor to typing code.

and if you typed `node app.js`, `node` (just consider it as) check `argv` if more than one, then it will execute another code for example function that accpet another waiting argument (file) to compile it 

<!--  -->
but why `argv` is called like that? what is refer to?
in C language `Array` his size is fixed not changable all life program
hence command line arguments i don't know how many argument i should type it in my script in cmd so `Array` is not suitable, so there is another data structure to store unlimited values? yes, it is `Vector`
`vector` like `array` but his size is not fixed, and from here `argv`
refer to `arguments vector` because arguments stored in `vector` not `array` 


<!--  -->
dealing with command line arguments you should do some operations like if conditions and logic to check number of arguments for example such that.