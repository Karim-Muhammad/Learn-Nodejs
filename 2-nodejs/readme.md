### Modules
It is just a file that contains some functions, classess, variables
which i can use them in many projects instead of build them from scratch again.

in Javascript you was doing like this
```js
export {App, Navbar, Math};
export default Main;
exports

import {App} from './Components/App';
import Main from './Components/Main';

```

in NodeJS, it is different!
```js
require()
```

`require()` it works as `import` in javascript.
and of course you import things that file which you import from, only that this file allowed to you to use, for example there are many helper function you are not allowed to import it, you import full method/function that do work and the functionality of this function uses these helpers functions.

for example
there is function calculate `area_of_circle` and accept just `radius` and output the `area`, this function within its functionality uses helper function is called `mutlple_radius_pi`

and you should import `area_of_circle` not `multiple_radius_pi`.


<!--  -->
#### Types of Modules
1. Built-in Modules
> These modules installed with nodejs in system
2. Third-party Modules
> These modules you can install it in NPM, Github, which other developers develop it, to ease development.
3. Custom Modules
> You can separated your projects to many modules to be maintainable, and reusable

<!--  -->
#### Types of installation
1. Global `npm install -g <package>`
> package will be installed in operating system, and we can use it in any where in our system and any projects without install it again for each project
2. Local `npm install <package>` [Recommended]
> install package in current project only and if you want use it in another project you habe have to install it again.
 why local is recommended? because if we give this project or upload it in somewhere, server dosen't have this package, it exist in your system, and not your server, so you have to install locally to be in `package.json` to allow the server install all these dependencies


<!--  -->
#### What is Package.json?
we noticed `node_modules` directory has a heavy size and if you want upload it or give it to someone, the project will be has megabyte size!
because of `node_modules` so, the solution to avoid this, we should ignore this folder in deployment(upload/sending), and rely on folder is called `package.json` that have all dependecies that should to be exist to work our project

so when someone take my prject without `node_modules` we have to install these modules again, bu simple command line `npm install` only without any package explicit


<!--  -->
Dependecies vs. DevDependencies
- *Dependecies*: all modules that our project depend on (functionality)
- *DevDependencies*: all modules that help us in development part, like scss transpile, eslint, gulp (non-functionality)


[tip]: when we use scripts in npm
     `npm run test`, `npm run start`
     but script `start` we can use it directly `npm start`
     this has special case, but other scripts you have to write `run` before it

if you wanna save your module/dependencies in `dependencies` in `package.json` , in previous versions you should type `--save`
if you want save it in `devDependecies` you should write `-d` === `--save-dev`, (nodemon package (for devDep)).

instead of install module first in `dependencies` then copy it and past it in `devDependecies` (fine way)

#### `package-lock.json`
> this file doesn't have to be exist in production, it just save all logs that you did, like delete, update

<!--  -->
each javascript file you create in nodejs, nodejs declare automatically variable is called `module` that have information of this file, and this variable is `object` and it has important property is called `exports` because `require()` function looking for it to import from it what wanted

```js
// ./my-module
module.exports = 100
module.exports = {}
module.exports = function(){}

// ./app.js
const mymod = require('./my-module'); // 100
const mymod = require('./my-module'); // {}
const mymod = require('./my-module'); // function() {}
```


real example
```js
const express = require('express');
```
when you did this
node will go to `express` file then access `module` object variable and then access to `exports` property that object as well, then import exports value either single value or object, function, anything

```js
module.exports.PI
exports.PI
```

```js
require('express');
> search on node_modules/ (not exist? search on global modules)
require('./express');
> search on current folder of active file
require('/express');
> search on root folder of project
```