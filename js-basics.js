// console.log('Numbers are addeded then concatenated: ', 5 + 3 + " Some text");
// console.log('Numbers are concatenated to string: ', "" + 5 + 3 + " Some text");

// console.log("aaoo".search(/[aA]{2,}/));

/**
 * This can be called in three ways
 * init_cache(); - without params, default value used
 * init_cache(15); - cache set to 15
 * init_cache(object); sets the object values
/*/
function init_cache() {
  let initData = {
    cacheSize: 10, //mb
    location: '/tmp',
    type: 'btree'
  };

  var args = arguments;

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'number') {
      initData.cacheSize = args[i];
    }
    else if (typeof args[i] === 'object') {
      initData = args[i];
    }
    // else {
    //   throw new Error('Bad params to init_cache');
    // }
  }

  console.log('init data', initData);
}

// Prototypal inheritance
function Shape() {
  this.x = 0;
  this.y = 0;

  this.move = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.moveFromOriginalPosition = function () {
    return this.x * this.x + this.y * this.y;
  }
}

function Square() {
}

Square.prototype = new Shape();
Square.prototype.__proto__ = Shape.prototype;
Square.prototype.width = 0;

Square.prototype.area = function () {
  return this.width * this.width;
}

let square = new Square();
square.move(15, 15);
square.width = 15;
//console.log('Calling Shape\'s function using square', square.moveFromOriginalPosition())
//console.log('ares of sqaure', square.area());

// Async programming
// setTimeout(() => {
//   console.log('Running after 2 seconds');
// }, 2000); // can be changed to any number, in milliseconds, 1000 - for 1 second

// console.log('waiting for job to complete');

// Reading file asynchronously
var fs = require('fs');
var buf = new Buffer.alloc(100000);

// fs.open('test.txt', 'r', (err, handle) => {
//   fs.read(handle, buf, 0, 100000, null, (err, length) => {
//     console.log(buf.toString('utf-8', 0, length));
//     fs.close(handle, () => { });
//   });
// });

// understanding this, returning call backs from a function
function FileObject() {
  this.fileName = '';

  // callback(err, boolean)
  this.fileExists = function (callback) {
    // This is to solve this reference after calling asnyc calls, also can be solved using arrow functions
    // let self = this;
    console.log('About to open:', this.fileName);

    fs.open(this.fileName, 'r', (err, handle) => { // use arrow functions, =>
      if (err) {
        console.log('Can\'t open:', this.fileName);
        callback(err);
        return;
      }

      fs.close(handle, () => { });
      callback(null, true);
    });
  }
}

// let fileObject = new FileObject();
// fileObject.fileName = 'test.txt';
// fileObject.fileExists((err, exists) => {
//   if (err) {
//     console.log('Error openening file:', JSON.stringify(err));
//   } else {
//     console.log('File exists:', exists);
//   }
// });

// Higher order functions

const add = (x, y) => x + y;
const createAdder = a => b => add(a, b);
const add1 = createAdder(2);
console.log('Higher order function:', add1(8)); // returns 10

const multiplier = factor => number => factor * number;

// can also be written as
function multiplierFunction(factor) {
  return function (number) {
    return factor * number;
  }
}

const doubleTheValue = multiplier(2);
const trippleThevaule = multiplier(3);

console.log('105 double is:', doubleTheValue(105));
console.log('105 tripple is:', trippleThevaule(105));

// Currying
const g = n => n + 1;
const f = n => n * 2;

const h = x => f(g(x));

console.log('Currying:', h(20));

// Compose

// takes any number of functions and returns a function which takes the initial value,
// and then uses reduceRight() to iterate right-to-left over each function, f, in fns,
// and apply it in turn to the accumulated value, y.
// What we're accumulating with the accumulator, y in this function is the return value for the function returned by compose()
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const hh = compose(f, g);

console.log('Currying using compose:', hh(40));

const trace = label => value => {
  console.log(`${label}: ${value}`);
  return value;
};

const h1 = compose(
  trace('after f'),
  f,
  trace('after g'),
  g
);

console.log('With tracer:', h1(20));

// It composes in reverse order, you can pass any number of funtions to pipe() or compose utilitiess
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const hh1 = pipe(
  g,
  trace('after g'),
  f,
  trace('after f'),
);

console.log('Currying with pipe using tracer, (in reverse order):', hh1(20));

// Scopes using let and const

const foo = function () {
  let local1 = 2;

  // block scope,
  {
    // declaring it using var, hoists the variable to the top of the function declation and can be accessible outside this scope
    let local2 = 3;
  }

  console.log(local1);
}

foo();
