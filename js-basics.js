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
  // console.log(wheel);
}

/**
 * Lexical scoping: An unbounded variable is bound to a definition in the defining scope
 * Dynamic scoping: An undbounded varable is bound to a varible passed in by the caller of the function
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

// foo1(10);

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

/**
 * ES6: Classes
 *
 * Overloading of constructor is not supported
 */
class Vehicle {
  constructor(type) {
    this.type = type;
    this.km = 0;
    this._color = 'Orange';
  }

  drive(distance) {
    this.km += distance;
    console.log(`Travelled ${this.km} Kms`);
  }

  /**
   * Defining color as property, looks like a function and can be accessed using 'instance.color'
   * it won't accept any parameters to a property function
   */
  get color() {
    return this._color;
  }

  /**
   * Properties to be set, should have _ before the field to be set,
   * but can be accessed without using _, _ will make it a private field
   * Oo else it end ups with a, 'RangeError: Maximum call stack size exceeded', because of setter being
   * called recurssively
   */
  set color(color) {
    this._color = color;
  }

  static info() {
    console.log(`This is a static method in a class`);
  }

  /**
   * Static getter can also be created and accessed as static fields are accessed
   */
  static get getInfo() {
    console.log('Static getter method');
  }
}

const vehicle = new Vehicle('car');
// vehicle.drive(10);

// console.log(vehicle);
// console.log(`Color of the vehicle is: ${vehicle.color}`);

// setting a property using a setter
vehicle.color = 'Red';
// console.log(`Color of the vehicle after changing is: ${vehicle.color}`);

// Vehicle.info();
// Vehicle.getInfo;

/**
 * Class expressions, used as expression and can be assigned to a variable.
 * Useful when we want to dynamically create a fields based on exteral configurations
 */
const classExp = class ClassExp { };

const ClassFactory = function (...Properties) {
  return class {
    constructor(...values) {
      for (const [index, property] of Properties.entries()) {
        this[property] = values[index];
      }
    }
  }
};

const Book = ClassFactory('title', 'pages');
// console.log(new Book('title1', 100));

const Music = ClassFactory('title', 'volume');
// console.log(new Music('title2', 'volume1'));

// Prototypal inheritance
const obj1 = { name: 'Punith' };

const use = function (person) {
  try {
    person.work();
  } catch (ex) {
    console.log('not found!');
  }
}

// since the method is not present, throws exception
// use(obj1);

const employment = {
  work: function () {
    console.log('working...!');
  }
}

const management = {
  work: function () {
    console.log('play golf...!');
  }
}

// sets the property to the obj1, using prototypal inheritance
Object.setPrototypeOf(obj1, employment);
// use(obj1);

// looks for nearest property in prototypal chain, if found executes it
Object.setPrototypeOf(obj1, management);
// use(obj1);

const Animal = function () {
  this.walk = function (dist) {
    this.km += dist;
  }
}

Animal.prototype.km = 0;

const animal1 = new Animal();
const animal2 = new Animal();

animal1.walk(10);
// console.log(`Animal-1's distance ${animal1.km} km`);
// console.log(`Animal-2's distance ${animal2.km} km`);

/**
 * You Don't Know JS: Kyle Simpson; this & Object prototypes
 */

// Assumption- 'this' refers to the function itself
function thisTest(num) {
  console.log('foo1:', num);
  this.count++;
}

thisTest.count = 0;
for (let i = 0; i <= 10; i++) {
  if (i > 5) {
    //thisTest(i);
  }
}

// 'this' doesnot refers to function's lexical scope
/**
 * 'this' is not an author-time binding but a runtime binding.
 * It is contextual based on the conditions of the function's invocation.
 * 'this' binding has nothing to do with where a function is declared,
 * but has instead everything to do with the manner in which the function is called.
 */
// it prints 0, since 'this' is not pointing to thisTest
// console.log(`thisTest was called ${thisTest.count} times`);

// above can be fixed using referring to foo.count++ inside the thisTest(num)
// another way to fix the above issue is calling call() method as follows
for (let i = 0; i <= 10; i++) {
  if (i > 5) {
    //thisTest.call(thisTest, i);
  }
}

// console.log(`thisTest was called ${thisTest.count} times`);

// call site of function execution decides the context of this
// there are 4 rules
// 1. Default binding

defaultValue = 10;

function defaultBinding() {
  // 'use strict'; // throws type error
  console.log(`default binding ${this.defaultValue}`);
}

// defaultBinding();

// 2. Implicit binding
// call-site have a context object, also referred to as an owning or containing object
function implicitBinding() {
  console.log(`implicit binding ${this.a}`);
}

let obj_2 = {
  a: 42,
  foo: implicitBinding
};

let obj_1 = {
  a: 2,
  obj_2: obj_2
};

// obj_1.obj_2.foo(); // it refers to obj_2's 'this', while referring to 'this.a' in implicitBinding()

/**
 * the call-site uses the 'obj' context to reference the function,
 * so you could say that the 'obj' object "owns" or "contains" the function reference at the time the function is called.
 */

// Implicitly lost
/**
 * One of the most common frustrations that 'this' binding creates is when an implicitly
 * bound function loses that binding, which usually means it falls back to the 'default binding',
 * of either the 'global object' or 'undefined', depending on 'strict mode'
 */
function implicitlyLost() {
  console.log(this.a);
}

var objImpl = {
  a: 2,
  foo: implicitlyLost
};

var bar = objImpl.foo; // function reference/alias
a = "oops, global"; // `a` also property on global object

// bar();

/**
 * The more subtle, more common, and more unexpected way this occurs is when we consider passing a 'callback' function
 */
function runImplicitlyLost(fn) {
  // `fn` is just another reference to `foo`
  fn(); // call-site
}

// runImplicitlyLost(objImpl.foo);

/**
 * Parameter passing is just an implicit assignment, and since we're passing a function,
 * it's an implicit reference assignment.
 */

// 3. Explicit binding
/**
 * Force a function call to use a particular 'object' for the 'this' binding,
 *  without putting a property function reference on the object
 */
function explicitBinding() {
  console.log(`Explicit binding ${this.a}`);
}

// use call() or apply() method bind an function to a object,
// explicitBinding.call(objImpl);

function explicitHardBinding() {
  console.log(`Explicit hard binding: ${this.a}`);
}

// explicit-hard-binding
let hardBinding = function () {
  explicitHardBinding.call(objImpl);
}

hardBinding();
// setTimeout(hardBinding, 100);

// it cannot be overriden
hardBinding.call(obj_2);

/**
 * The most typical way to wrap a function with a hard binding
 * creates a pass-thru of any arguments passed and any return value received
 */

function explicitBinding1(something) {
  console.log(`Explicit binding ${this.a}, ${something}`);
  return this.a + something;
}

let hardBinding1 = function () {
  return explicitBinding1.apply(objImpl, arguments);
};

let sum = hardBinding1(3);
console.log(`sum is: ${sum}`);


// simple `bind` helper
function bindHelper(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  };
}

var sumHelper = bindHelper(hardBinding1, objImpl);

let sum1 = sumHelper(5);
console.log(`sum is ${sum1}`);

/**
 * Since hard binding is such a common pattern,
 * it's provided with a built-in utility as of ES5: 'Function.prototype.bind'
 */
let protoBinding = hardBinding1.bind(objImpl);
let sum2 = protoBinding(4);
console.log(`sum is ${sum2}`);

// API Call contexts
/**
 * many new built-in functions in the JavaScript language and host environment,
 * provide an optional parameter, usually called "context",
 * which is designed as a work-around for you not having to use 'bind(..)'
 * to ensure your callback function uses a particular 'this'.
 */
function apiCallContext(element) {
  console.log(element, this.id);
}

var obj_api = {
  id: "awesome"
};

// [1, 2, 3].forEach(apiCallContext, obj_api);

// 4. 'new' Binding
/**
 * In JS, constructors are just functions that happen to be called with the new operator in front of them.
 * They are not attached to classes, nor are they instantiating a class.
 * They are not even special types of functions.
 * They're just regular functions that are, in essence, hijacked by the use of new in their invocation
 */

/**
 * When a function is invoked with new in front of it, otherwise known as a 'constructor' call,
 * the following things are done automatically:
 * 1. A brand new object is created (aka, constructed) out of thin air
 * 2. The newly constructed object is [[Prototype]]-linked
 * 3. The newly constructed object is set as the 'this' binding for that function call
 * 4. unless the function returns its own alternate object, the
 *    new-invoked function call will automatically return the newly constructed object.
 */

function newFoo(a) {
  this.a = a;
}

var newBind = new newFoo(4);
console.log(`new bind ${newBind.a}`);

function newBinding() {
  this.baz = 'baz';
  console.log(`${this.bar} ${baz}`)
}

var bar = 'bar';
var baz = new newBinding();
console.log(`After new, value is ${baz.baz}`);