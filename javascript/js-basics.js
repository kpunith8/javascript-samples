// console.log('Numbers are added then concatenated: ', 5 + 3 + " Some text");
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

/*  Async programming */
/* setTimeout(() => {
  console.log('Running after 2 seconds');
}, 2000); // can be changed to any number, in milliseconds, 1000ms - for 1 second
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
    // This is to solve this reference after calling async calls, also can be solved using arrow functions
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
//   console.log('Error opening file:', JSON.stringify(err));
//   } else {
//     console.log('File exists:', exists);
//   }
// });

/* Eric Elliot - Medium */
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
const tripleTheValue = multiplier(3);

// console.log('105 double is:', doubleTheValue(105));
// console.log('105 triple is:', tripleTheValue(105));

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

// It composes in reverse order, you can pass any number of functions to pipe() or compose utilities
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
    // declaring it using var, hoists the variable to the top of the function declaration and can be accessible outside this scope
    let local2 = 3;
  }

  // console.log('accessing local variable', local1);
};

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
// on sending side it becomes spread operator and receiving side it becomes a rest operator

const name1 = ['Tom', 'Jerry'];
const name2 = ['Tyke'];

// spreads the elements of name1 and name2 to new array with elements in it.
// console.log('Manipulating array using spread operator', [...name1, 'Spike', ...name2]);

// spread operator also can be used to create the copy of the object without mutating it
const olderSam = { ...sam, age: sam.age + 1 };
// console.log('Older Sam', olderSam);

// enhanced 'for of' loop, it does not have a index value to use it for further processing
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

    /* implementation without generator */
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
  // console.log(wheel);
}

/**
 * Lexical scoping: An unbounded variable is bound to a definition in the defining scope
 * Dynamic scoping: An unbounded variable is bound to a variable passed in by the caller of the function
 */

const stuff = 4;
this.something = 12;

/**
 * In a regular function, all variables are lexically scoped, except 'this' and 'arguments' which are dynamically scoped.
 * In an arrow functions, all variables (including this and arguments) are lexically scoped.
 */
const foo1 = function (n) {
  console.log('n:', n);
  console.log('stuff:', stuff); // lexical scoping
  console.log('this.something:', this.something); // prints 'undefined', dynamically scoped
}

// foo1('foo1', 10);

// Bind 'this.something' to foo1 so that it gets the value
// foo1.call({ something: 42 }, 10);

const foo2 = n => {
  console.log('n:', n);
  console.log('stuff:', stuff); // lexical scoping
  console.log('this.something:', this.something); // prints 12, and lexically scoped
}

// foo2(10);

/* Avoid writing class methods as arrow functions, because they need global scoping. */

const Draw = function () {
  console.log(new.target); // it prints Function: Draw if it was invoked through new variable or else it is undefined
  console.log('called...!');
}

// new Draw();
// Draw();

// ES6 Classes and advanced prototypal inheritance moved to es6-features.js and js-oop.js

// this binding details moved to advanced-js.js;


function test(x) {
  let s = x;

  if(s) {
    // allowed to declare s inside the if block,
    // s is block scoped, but it carries the value 1,
    // not going to assign s to 10.
    const s = 10;
    var a = 11;
    var b = 30;
    let c = 30;
  }

  console.log('Values in test()', x, s, a, b); // 1, 1, 11, 30
}

test(1);

// Function declaration and Function expressions
// Function declarations can be called earlier than it is defined, but function expressions are not
printName();

// function declaration
function printName() {
  console.log('Hello Punith');
}

// A Function Expression is created when the execution reaches it and is usable only from that moment.

// Reference Error
// printIt('Punith');

// function expression
const printIt = function(name) {
  console.log('Function expression:', name);
};

// Understanding this with arrow functions
// 1. arrow functions do not have their own this binding or prototype and cannot be used as a constructor.
// 2. Arrow functions have lexical this, meaning the value of this is determined by the surrounding scope.
const printNumbers = {
  phrase: "The current value is:",
  numbers: [1, 2, 3, 4],

  loop() {
    this.numbers.forEach(function (number) {
      console.log(this.phrase, number);
    });
  },
};

// printNumbers.loop();
// Above call would return undefined 1, undefined 2 and so on.
// Traditional function will not determine its `this` value from the scope of the environment, which is the printNumbers object.

// To fix this we need to bind the anonymous function passed to forEach as
/*
loop() {
  // Bind the `this` from printNumbers to the inner forEach function
  this.numbers.forEach(
    function (number) {
      console.log(this.phrase, number)
    }.bind(this),
  )
}
*/

// With arrow functions we don't need to bind `this`, because `this` value is determined based on the its lexical scope
/*
loop() {
  this.numbers.forEach((number) => {
    console.log(this.phrase, number)
  })
}
*/


// Check password - regex
function checkPassword(password) {
  const oneLowercaseLetter = /(?=.*[a-z])/; // Positive look ahead; use ! for negative look ahead (= should be replaced by !)
  const oneUppercaseLetter = /(?=.*[A-Z])/;
  const oneDigit = /(?=.*[0-9])/;
  const oneSpecialCharacter = /(?=.*[!@#$%^&*])/;
  const minimumEightCharacters = /(?=.{8,})/;

  const isValid =
    oneLowercaseLetter.test(password) &&
    oneUppercaseLetter.test(password) &&
    oneDigit.test(password) &&
    oneSpecialCharacter.test(password) &&
    minimumEightCharacters.test(password);

  return isValid ? "Your password is valid!" : "Your password is not valid!";
}

console.log(checkPassword("Pd123#uyt"));
console.log(checkPassword("dd123#uyt"));

// Look behind
// str.match(/(?<=\$)\d+/) // Matches $30 in the string

// Capturing groups and reusing the pattern
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/; // \1 to repeat the capture group
repeatRegex.test(repeatStr); // Returns true
console.log("RegEx capturing groups: Strings:", repeatStr.match(repeatRegex)); // Returns ["regex regex", "regex"]

let repeatNum = "42 42 42";
// Match exactly 3 times, could be any number with a space in between
let reRegex = /^(\d+)\s\1\s\1$/; // Returns ["42 42 42", "42"]
reRegex.test(repeatNum);
console.log("RegEx capturing groups: numbers:", repeatNum.match(reRegex));

// Remove whitespaces from the beginning and at the end using regex
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g;
let result = hello.replace(wsRegex, "");
console.log("string without spaces:", result);
