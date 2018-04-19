---
title: Closure in constructor
tags: ['Javascript bites']
date: 2018-04-20 00:40:13
---

> Closure in constructor is bad idea.

People with the experience in classical OOP languages like C++ or Java usually
try to map OOP patterns in JavaScript. With this approach one of the most
important JavaScript concepts - the way how objects inherit features from one
another - is ignored. Partly because it involves weird syntax
and partly because same functionality can be achieved with the familiar constructs.

Take a look at this physically encapsulated, easy to read and easy to understand OOP-like code:

```js
function Brick(w, h, d) {
  this.width = w;
  this.height = h;
  this.depth = d;

  this.volume = function() {
    return this.width * this.height * this.depth;
  };
}

console.log(new Brick(10, 5, 2).volume()); // prints 100
```

When JavaScript closures are mastered, the code looks like:

```js
function Brick(w, h, d) {
  this.volume = function() {
    return w * h * d;
  };
}

console.log(new Brick(10, 5, 2).volume()); // prints 100
```

The correct way to write above functionality is to define `volume` method using
prototype property.

```js
function Brick(w, h, d) {
  this.width = w;
  this.height = h;
  this.depth = d;
}

Brick.prototype.volume = function() {
  return this.width * this.height * this.depth;
};

console.log(new Brick(10, 5, 2).volume()); // prints 100
```

There are at least two reasons for that:

1.  Methods defined via prototype property can be inherited.
2.  Methods defined via prototype property are shared between created instances.

I wrote simple test to compare memory usage when using closure in constructor
and when using prototype.


| Number of created bricks | With closure in constructor | With prototype |
| ------------------------ | --------------------------- | -------------- |
| 1000                     | 4.37 MB                     | 4.25 MB        |
| 10 000                   | 5.83 MB                     | 4.36 MB        |
| 100 000                  | 19.34 MB                    | 4.36 MB        |


These results are produces on MacBook Pro (Retina, 15-inch, Mid 2015),
MacOS 10.13.4, 2.5 GHz Intel Core i7, 16 GB 1600 MHz DDR3 using NodeJs v9.1.0

`closure.js`

```js
function Brick(w, h, d) {
  // closure in constructor
  this.volume = function() {
    return w * h * d;
  };
}

// allocation
let size = process.argv[2] || 0;
for (let index = 0; index < size; index++) {
  new Brick(index, index, index).volume();
}

// mem usage
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
```

`prototype.js`

```js
function Brick(w, h, d) {
  this.width = w;
  this.height = h;
  this.depth = d;
}

Brick.prototype.volume = function() {
  return this.width * this.height * this.depth;
};

// allocation
let size = process.argv[2] || 0;
for (let index = 0; index < size; index++) {
  new Brick(index, index, index).volume();
}

// mem usage
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
```

`bash commands`

```bash
>  node closure.js 1000
The script uses approximately 4.37 MB

>  node closure.js 10000
The script uses approximately 5.83 MB

>  node closure.js 100000
The script uses approximately 19.34 MB

>  node prototype.js 1000
The script uses approximately 4.25 MB

>  node prototype.js 10000
The script uses approximately 4.36 MB

>  node prototype.js 100000
The script uses approximately 4.36 MB
```
