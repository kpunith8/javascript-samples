// console.log('Numbers are addeded then concatenated: ', 5 + 3 + " Some text");
// console.log('Numbers are concatenated to string: ', "" + 5 + 3 + " Some text");

// console.log("aaoo".search(/[aA]{2,}/));

/**
 * This can be called in three ways
 * init_cache(); - without params, default value used
 * init_cache(15); - cache set to 15
 * init_cache(object); sets the object values
 */
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
    /* else {
      throw new Error('Bad params to init_cache');
    } */
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

/*  Async programming */
/* setTimeout(() => {
  console.log('Running after 2 seconds');
}, 2000); // can be changed to any number, in milliseconds, 1000 - for 1 second
 */
// console.log('waiting for job to complete');

/* Reading file asynchronously */
var fs = require('fs');
var buf = new Buffer.alloc(100000);

/* fs.open('test.txt', 'r', (err, handle) => {
  fs.read(handle, buf, 0, 100000, null, (err, length) => {
    console.log(buf.toString('utf-8', 0, length));
    fs.close(handle, () => { });
  });
}); */

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

/* Erric Elliot - Medium */
/* Higher order functions */

const add = (x, y) => x + y;
const createAdder = a => b => add(a, b);
const add1 = createAdder(2);
// console.log('Higher order function:', add1(8)); // returns 10

const multiplier = factor => number => factor * number;

// can also be written as
function multiplierFunction(factor) {
  return function (number) {
    return factor * number;
  }
}

const doubleTheValue = multiplier(2);
const trippleThevaule = multiplier(3);

// console.log('105 double is:', doubleTheValue(105));
// console.log('105 tripple is:', trippleThevaule(105));

// Currying
const g = n => n + 1;
const f = n => n * 2;

const h = x => f(g(x));

// console.log('Currying:', h(20));

// Composition

/* takes any number of functions and returns a function which takes the initial value,
and then uses reduceRight() to iterate right-to-left over each function, f, in fns,
and apply it in turn to the accumulated value, y.
What we're accumulating with the accumulator, y in this function is the return value for the function returned by compose() */
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const hh = compose(f, g);

// console.log('Currying using compose:', hh(40));

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

// console.log('With tracer:', h1(20));

// It composes in reverse order, you can pass any number of funtions to pipe() or compose utilitiess
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const hh1 = pipe(
  g,
  trace('after g'),
  f,
  trace('after f'),
);

// console.log('Currying with pipe using tracer, (in reverse order):', hh1(20));

/* Venkat Subramanian - Rediscovering JS */

// Scopes using let and const
const foo = function () {
  let local1 = 2;

  // block scope,
  {
    // declaring it using var, hoists the variable to the top of the function declation and can be accessible outside this scope
    let local2 = 3;
  }

  // console.log('accessing local variable', local1);
};

// Immediately Invoked Function Expression: Create the function and execute immediately
(function () {
  // console.log('IIFE in action');
}());

/* const protects the reference not the objects, it is allowed to mutate the property of an object
Object.freeze() protects the object enclosed, (Shallow freezes not deep freezes) but the nested object
properties are not protected;
use 'use strict' option to let compiler to throw an error for modifying the value of an object once it
is frozen */
const sam = Object.freeze({ name: 'Sam', age: 16 });
// console.log('Sam before mutating', sam);
sam.age = 20;
// console.log('Sam after mutating the age', sam);

// rest operator
const max = (...numbers) => {
  return numbers.reduce((large, e) => e > large ? e : large);
}

// console.log('max', max(3, 19, 13, 8));

// don't consider using arguments, use rest(...) operator instead
// on sending side it becomes spread operator and recieving side it becomes a rest operator

const name1 = ['Tom', 'Jerry'];
const name2 = ['Tyke'];

// spreads the elements of name1 and name2 to new array with elements in it.
// console.log('Manipulating array using spread operator', [...name1, 'Spike', ...name2]);

// spread operator also can be used to create the copy of the object without mutating it
const olderSam = { ...sam, age: sam.age + 1 };
// console.log('Older Sam', olderSam);

// enhanced for loop, it does not have a index value to use it for further processing
/* for (const name of name1) {
  console.log('using enhanced for loop', name);
} */

// use entries() method on array to get entry array with index attached to it
for (const [index, name] of name1.entries()) {
  // console.log(`entry of an item in an array: ${index} ${name}`);
}

// Using symbols and generators to create custom iterators
class Wheel {
}

class Car {
  constructor() {
    this.wheels = [
      new Wheel(),
      new Wheel(),
      new Wheel(),
      new Wheel(),
    ];
  }

  *[Symbol.iterator]() { // use generator(*) to reduce the boilerplate code implemented below

    /*
    for (const wheel of this.wheels) {
      yield wheel;
    }
    */
    yield* this.wheels;

    /* implementation without gererator */
    /*
    let index = 0;
    const self = this;

    return {
      next: function () {
        return { done: index === 4, value: self.wheels[index++] }
      }
    };
    */
  }
}

const car = new Car();

// it ends up in car is not a iterable error, to make it a iterable use [Symbol.iterator] to implement it
for (const wheel of car) {
  console.log(wheel);
}



