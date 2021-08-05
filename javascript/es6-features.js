import fs, { createReadStream } from "fs";

import AsyncQueue from "../data-structure/async-queue.js";

/* Search for 'Example' keyword to look for example programs with the features tagged */

/* DEFAULT PARAMS */
// const GST = (price, tax = 0.20, term = 1) => price * tax * term;

// const calcInterest = (amount, term, interest = 0.5 * amount * term) => console.log('Total:', interest + amount);

// console.log('Tax:', GST(25, 2));

// calcInterest(2000, null);

/* REST OPERATOR - rest operators always goes to end after the params are declared */
// const restParams = (name, ...params, jsjsjs) => {
//   console.log(params);
//   return name + " " + params.map(value => {
//     return value + "name"
//     //return value;
//   });
// };

// console.log(restParams('Punith', 'K', 'SSE', 30));

// function sum(...params) {
//   return params.reduce((acc, value) => acc + value);
// }

// const numbers = [1, 2, 3, 4, 5];`

// console.log('Sum:', sum(...numbers));

/* exploringjs.com */
// Inside object literals, the spread operator (...)
// inserts all enumerable own properties of its operand into the object created via the literal:
const obj31 = { foo: 1, bar: 2 };
console.log("Spread operators in object literals:", { ...obj31, baz: 3 });

// Note that order matters even if property keys don’t clash, because objects record insertion order:
// If keys clash, order determines which entry “wins”
console.log("Spread operator replaces with latest, if key clash:", {
  ...obj31,
  foo: true,
});

// The prototypes of the clones are always `Object.prototype` which is the default for objects created via object literals
const clone1 = { ...obj31 };
const clone2 = Object.assign({}, obj31);

// Object.getPrototypeOf(clone1) === Object.prototype

// Cloning an object, including its prototype:
const clone3 = { __proto__: Object.getPrototypeOf(obj31), ...obj31 };
const clone4 = Object.assign(
  Object.create(Object.getPrototypeOf(obj31)),
  obj31
);

console.log(
  "Clones created with prototype using spread and Object.asign():",
  clone3,
  clone4
);

/* DESTRUCTURING */
/* OBJECT DESTRUCTURING */
const name = {
  fName: "Punith",
  lName: "P",
  age1: 30,
  education: {
    degree: "Masters",
    specification: "CSE",
  },
};

/* Object destructuring can help remove the positional parameters for eg,
function fetchRepos({
  language = "all",
  minStars = 0,
  maxStarts = 100,
  createdTime = ""
}) {}

const date = {
  h: 12,
  m: 12,
  s: 44
};

// const { h: hour, m: minutes, s: seconds } = date;
// console.log(hour, minutes, seconds);

// Can be invoked as, Passing arguments in order is not required
// fetchRepos({
//   language: 'java',
//   maxStarts: 100,
//   minStars: 10,
//   createdTime: new Date('01/01/2017').getTime()
// });

// console.log(name.fName, name.lName);

// const { fName, lName, age1 } = name;
// console.log(fName, lName, age1);

// const { education: { degree, specification } } = name;

// console.log(degree, specification);

// assigning to a variable
// const { fName: firstName, lName: lastName, age1: age } = name;

// console.log('Object destructuring, named variables:', firstName, lastName, age);

// console.log('Object destructuring: ', fName, lName, age);

// console.log('Nested object destructuring: ', degree, specification);

/* ARRAY DESTRUCTURING */
const numbers = [1, 2, 3, 4, 5];
//var [a, , c, , d] = numbers;

//console.log('Array destructuring:', a, c, d);

/* TEMPLATE LITERALS */

// const Name = "Punith";
// const LName = "K";

// console.log(`Name is: ${Name} and ${LName}`);
// console.log("name" + " " + Name + " " + "Last Name" + " " + LName);

// Multi line without using \n
// console.log(`Hi there

// check this out
// `);

// console.log("about" + "\n" +
//   "me");

/* ES6- GOOD PARTS - KYLE SIMPSON */

/* ARROW FUNCTIONS */
// this with arrow
const obj1 = {
  id: 22,
  timer: function timer() {
    // To solve the this binding do the following, or bind the function to `this`, function() {}.bind(this);
    let self = this;
    console.log("inside a obj1, ", this.id);
    setTimeout(function () {
      console.log("this reference inside setTimeout:", self.id); // here `this` refers to global window object
    }, 0);
  },
};

// arrow functions doesn't have `this` keyword, goes up one level lexically gets `this` from its surrounding scope.
const obj2 = {
  id: 23,
  timer: function timer() {
    setTimeout(
      () => console.log("this reference in arrow functions", this.id),
      0
    );
  },
};

const obj3 = {
  model: "Fiesta",
  manufacturer: "Ford",
  fullName: function () {
    return `Car Model, ${this.model} ${this.manufacturer}`;
  },
  fullModelName: () => {
    // returns undefined
    return `\nInside a arrow, Car Model, this reference, ${this.model} ${this.manufacturer}`;
  },
};

obj1.timer();
obj2.timer();
// console.log(obj3.fullName(), obj3.fullModelName());

/* Understanding var scope */
function varScope(x, y) {
  if (x > y) {
    var temp = x; // temp is hoisted up to varScope() and available within the function body
  }
  console.log("temp outside if:", temp);

  for (var i = 0; i < 10; i++) {} // i is hoisted up to varScope() and available within the function body
  console.log("i outside of for:", i);
}

varScope(5, 2); // prints 5 and 10 for temp and i respectively

/* Understanding let scope */
function letScope(x, y) {
  if (x > y) {
    let temp = x; // temp is block scoped and  not available outside the if scope.
  }
  // console.log("temp outside if:", temp);

  for (let i = 0; i < 10; i++) {} // i is block scoped and not available outside the for.
  // console.log("i outside of for:", i);
}

letScope(5, 2); // would print temp is not defined error

/* Understanding `const` with respect to Immutability */
var x1 = 2;
x1++; // allowed

const y1 = 10;
// y1++; // not allowed

const z1 = [10, 12, 13];
// z1 = 10; // not allowed, here z is reference to the array, reference of an const cannot be changed
z1[1] = 20; // allowed, value within an array can be modified, immutability doesn't work here

const a = Object.freeze([4, 5, 6, [7, 8]]);
// a = 10; // not allowed
// a[1] = 20; // not allowed
a[3][0] = 10; // allowed, nested array can not be frozen to change, freeze applies shallow immutability

console.log("Mutating the nested array when Object.freeze() called:", a);

// TDZ - Temporal Dead Zone - accessing the variable before it is declared (Reference error)
// const variable cannot be reassigned not the values inside them
// const arr = [1, 2 ,3]; arr[1]=10 is allowed to make the changes, but not the arr = []
function constUsage() {
  const arr = [1, 2, 3, 4];

  return function resetArray() {
    // arr = null; // it is not allowed to assign a const variable even with null, only the way to reset is arr.length = 0;
    arr.length = 0;
    // if it is an array deleting all the props is trickier than setting to null;
  };
}

constUsage()();

function truthyTest(x) {
  var x = x || 22;
  // to fix this to consider 0 as truthy add the logic as follows,  x = x !== undefined ? x : 22;

  //  var x = x !== undefined ? x : 22;
  // possible falsy values in JS are: 0, "", false, null, undefined, ans NaN
  console.log("Value of x when x is 0 for integer:", x);
}

truthyTest(0); // passing undefined(when the other check added) prints 22 because undefined tells nothing is passed,
// but undefined is passed to the function, it is same as ignoring passing the param to the function.

// NaN is not equal to null or undefined
console.log("NaN == NaN or NaN === NaN is (false):", NaN == NaN);
// other falsy values == other falsy value is always `true`

/* DEFAULT VALUES */
function defaultMethod() {
  console.log("Default method invoked");
  return 2;
}

function testDefaultValue(x = defaultMethod()) {
  console.log("x in testDefaultValue is:", x);
}

// when we call
testDefaultValue(1); // It executes the method with value and 1 prints 1
testDefaultValue(undefined); // It executes defaultMethod() since no value is passed to testDefaultValue()
// ES6 evaluates the default value invocation lazily until it is needed.

// one usage may be throwing an error when the value is not passed
// can also nb used to generate unique id if one is not passed.
function isValueRequired(paramName) {
  throw `value ${paramName} is required`;
}

function testIsValueRequired(
  x = isValueRequired("x"),
  y = isValueRequired("y")
) {
  console.log("Default value required:", x, y);
}

testIsValueRequired(10, 20); // Don't pass any variables to function

var x1 = 1;
function testDefaultValue1(
  x1 = 2,
  f = function () {
    return x1;
  }
) {
  // var x1= 5;
  console.log(
    "Default value returned from a function declared within param list:",
    f()
  );
}

testDefaultValue1();

/* REST/SPREAD OPERATOR (...) */
function spreadEx(x, y, ...rest) {
  console.log(
    "Array spread operator:",
    "x:",
    x,
    "y:",
    y,
    "rest params:",
    ...rest
  );
}

const a1 = [1, 2, 3];
const a2 = [4, 5, 6];
const a3 = [1];
spreadEx(...a1, ...a2);
spreadEx(...a3, ...a2);

//EXAMPLE: Remove duplicate from a string
const str1 = "Hello World!"; // String is an iterable
console.log(
  "String as an iterable, use ..., remove spaces using filter:",
  [...str1].filter((x) => x !== " ").join("")
);
console.log(
  "Remove duplicates in a string:",
  new Set([...str1].filter((x) => x !== " "))
);

// Destructuring and default params can be used together
const b1 = [1, 2];
const [b11, b12, b13 = 3] = b1;

console.log("Destructuring and default params:", b11, b12, b13);

const b2 = [1, 2, [3, 4, 5]];
const [b14, b15, ...args] = b2;

console.log("Nested array destructuring:", b14, b15, args);

let x, y, z, z11, x11, y11;
let obj12 = { a: 1, b: 2, c: 3, d: { e: 4 } };
// assign default value if the property doesn't exist
// surround with (), if variables declared in the top and destructured somewhere else
// in array destructuring we don't need (),since { } indicates that as a block of code.
({ a: x, b: y, c: z, d: { e: z11 } = {}, d: x11, b: y11 } = obj12 || {});

console.log(
  "In object destructuring property:assignment:",
  x,
  y,
  z,
  x11,
  y11,
  z11
);

// If an object doesn't have the property that is being referenced while destructuring it goes up the prototype chain and
// reads it from there

// concise properties and methods
// if the property name of a object to be same as assignment don't assign one; var obj = {a: a};
var x13 = 1;
var c = "hello";
var obj13 = { x13, b() {}, [c]: 42 }; // computed properties can be put within [] and can be any valid JS expressions

// here concise methods are lexically anonymous, not able to access them

/* TEMPLATE LITERALS */
// Tag functions
function tagFunctions(strings, ...values) {
  console.log("Tag functions accepting values:", strings, values);
}

let total = 200.0;
let fName = "Punith";
tagFunctions`Hello ${fName}, your bill is ${total}`;

/* ES-2018 - exploringjs.com */

/* RegEx: Named Capture Groups - proposal */

// Prior to this, captured groups were numbered and accessed with an index
const RE_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;

const matchObj = RE_DATE.exec("1999-12-31");
console.log(`RegEx captured groups: Year: ${matchObj[1]}
Month: ${matchObj[2]}
Day: ${matchObj[3]}`);

// With captured names
const RE_DATE_NAMES = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const matchObjNames = RE_DATE_NAMES.exec("2020-03-16");
console.log(`RegEx captured groups with names: Year: ${matchObjNames.groups.year}
Month: ${matchObjNames.groups.month}
Day: ${matchObjNames.groups.day}`);

// Named capture groups also create indexed entries; as if they were numbered capture groups
// Destructure them for reability
const {
  groups: { day, year },
} = RE_DATE_NAMES.exec("1999-12-31");

/* Back References */

// \k<name> in a regular expression means: match the string that was previously matched by the named capture group name.
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
// RE_TWICE.test('abc!abc'); // true
// RE_TWICE.test('abc!ab'); // false

// The backreference syntax for numbered capture groups works for named capture groups, too

// const RE_TWICE_1 = /^(?<word>[a-z]+)!\1$/;
// RE_TWICE_1.test('abc!abc'); // true
// RE_TWICE_1.test('abc!ab'); // false

// Mix both syntaxes

// const RE_TWICE_2 = /^(?<word>[a-z]+)!\k<word>!\1$/;
// RE_TWICE_2.test('abc!abc!abc'); // true
// RE_TWICE_2.test('abc!abc!ab'); // false

/* replace() and named capture groups */

// replace() supports named capture groups in two ways.
// First, you can mention their names in the replacement string:

console.log(
  "replace() and named captured groups:",
  "1999-12-31".replace(RE_DATE_NAMES, "$<month>/$<day>/$<year>")
);

// Second, each replacement function receives an additional parameter that holds an
// object with data captured via named groups.
console.log(
  "1982-11-1".replace(
    "replace() and named captured groups with additional params:",
    RE_DATE_NAMES,
    (g0, y, m, d, offset, input, { year, month, day }) =>
      month + "/" + day + "/" + year
  )
);

// Where,
// g0 - contains the whole matched substring, '1999-12-31'
// y, m, d - are matches for the numbered groups 1–3 (which are created via the named groups year, month, day).
// offset - specifies where the match was found.
// input - contains the complete input string.
// The last parameter contains one property for each of the three named capture groups
// year, month and day. We use destructuring to access those properties.

// another way of accessing the last argument:
console.log(
  "replace() and named captured groups with destructuring:",
  "2012-11-13".replace(RE_DATE_NAMES, (...args) => {
    const { year, month, day } = args[args.length - 1];
    return month + "/" + day + "/" + year;
  })
);

/* Unicode Property Escapes */

/* Meta programming */
// Proxies
/*
Proxies are special objects that allows to customize the operations.
A proxy is created with two parameters:

1. handler: For each operation, there is a corresponding handler method that – if present – performs that operation.
Such a method intercepts the operation (on its way to the target) and is called a trap.

2. target: If the handler doesn’t intercept an operation then it is performed on the target.
That is, it acts as a fallback for the handler.
*/
const target = {};
const handler = {
  /** Intercepts: getting properties */
  get(target, propKey, receiver) {
    console.log(`GET ${propKey}`);
    return 123;
  },

  /** Intercepts: checking whether properties exist */
  has(target, propKey) {
    console.log(`HAS ${propKey}`);
    return true;
  },
};
const proxy = new Proxy(target, handler);

console.log(proxy.foo);
console.log("hello" in proxy);

// The handler doesn’t implement the trap set (setting properties).
// Therefore, setting proxy.bar is forwarded to target and leads to target.bar being set.
proxy.bar = "abc";
console.log("setting props using proxy:", target.bar);
