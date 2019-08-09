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

/* DESTRUCTURING */
/* OBJECT DESTRUCTURING */
const name = {
  fName: "Punith",
  lName: "P",
  age1: 30,
  education: {
    degree: "Masters",
    specification: "CSE"
  }
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

// console.log('Object destructuring, named variabes:', firstName, lastName, age);

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

/* GENERATORS */

function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
const gen = generateNumbers();

// console.log(gen.next());
// console.log(gen.next());

for (let value of gen) {
  console.log(value);
}

// Naturally, as generators are iterable, we can call all related functionality, e.g. the spread operator ...
let sequence = [0, ...generateNumbers()];
console.log(sequence);

// The special yield* directive is responsible for the composition.
// It delegates the execution to another generator. Or, to say it simple,
// it runs generators and transparently forwards their yields outside, as if they were done by the calling generator itself.
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57);
  // or (let i = 48; i <= 57; i++) yield i; /* Or inline the generators*/

  // A..Z
  yield* generateSequence(65, 90);
  //  for (let i = 65; i <= 90; i++) yield i;

  // a..z
  yield* generateSequence(97, 122);
  // for (let i = 97; i <= 122; i++) yield i;
}

let str = "";

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(`Password codes ${str}`);

function* gen1() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2?"; // (*)

  console.log(result);
}

let generator = gen1();

let question = generator.next().value; // <-- yield returns the value

generator.next(5); // --> pass the result into the generator

let range = {
  from: 1,
  to: 5,

  // for..of calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (let value of range) {
  console.log(`using Symbol.iterators: ${value}`);
}

let asyncRange = {
  from: 1,
  to: 5,

  // for await..of calls this method once in the very beginning
  [Symbol.asyncIterator]() {
    // ...it returns the iterator object:
    // onward, for await..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      async next() {
        // it should return the value as an object {done:.., value :...}
        // (automatically wrapped into a promise by async)

        // can use await inside, do async stuff:
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// (async () => {
//   for await (let value of asyncRange) {
//     console.log(`Using Async Generators: ${value}`);
//   }
// })();

/* ES6- GOOD PARTS - KYLE SIMPSON */

/* ARROW FUNTCTIONS */
// this with arrow
const obj1 = {
  id: 22,
  timer: function timer() {
    // To solve the this binding do the following, or bind the function to `this`, function() {}.bind(this);
    let self = this;
    setTimeout(function() {
      console.log("this reference inside setTimeout:", self.id); // here `this` refers to global window object
    }, 10);
  }
};

// arrow functions doesn't have `this` keyword, goes up one level lexically gets `this` from its surrounding scope.
const obj2 = {
  id: 23,
  timer: function timer() {
    setTimeout(
      () => console.log("this reference in arrow functions", this.id),
      10
    );
  }
};

const obj3 = {
  model: 'Fiesta',
  manufacturer: 'Ford',
  fullName: function() {
    return `Car Model, ${this.model} ${this.manufacturer}`;
  },
  fullModelName: () => {
    return `Car Model, arrow function, this refernce, ${this.model} ${this.manufacturer}`;
  }
}

obj1.timer();
obj2.timer();
console.log(obj3.fullName(), obj3.fullModelName());

/* Understanding var scope */
function varScope(x, y) {
  if (x > y) {
    var temp = x; // temp is hoisted up to varScope() and available within the function body
  }
  console.log("temp outside if:", temp);

  for (var i = 0; i < 10; i++) {} // i is oisted up to varScope() and available within the function body
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
a[1] = 20; // not allowed
a[3][0] = 10; // allowed, nested array can not be frozen to change, freeze applies shalow immutability

console.log("Mutating the nested array when Object.freeze() called:", a);

// TDZ - Temporal Dead Zone - accessing the vaiable before it is declared (Reference error)
// const variable cannot be reassigned not the values inside them
// const arr = [1, 2 ,3]; arr[1]=10 is allowed to make the changes, but not the arr = []
function constUsage() {
  const arr = [1, 2, 3, 4];

  return function resetArray() {
    // arr = null; // it is not allowed to assign a const variable even with null, onlt the way to reset is arr.length = 0;
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
// but undefined is passed to the funtction, it is same as ignoring passing the param to the function.

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
// ES6 evaluates the default value invokation lazily until it is needed.

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
  f = function() {
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
function spreadExample(x, y, ...rest) {
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
spreadExample(...a1, ...a2);
spreadExample(...a3, ...a2);

//PROG: Remove duplicate from a string
const str1 = "Hello World!"; // String is an iterable
console.log(
  "String as an iterable, use ..., remove spaces using filter:",
  [...str1].filter(x => x !== " ")
);
console.log(
  "Remove duplicates in a string:",
  new Set([...str1].filter(x => x !== " "))
);

// Destructuring and default params can be used together
const b1 = [1, 2];
const [b11, b12, b13 = 3] = b1;

console.log("Destructuring and default params example:", b11, b12, b13);

const b2 = [1, 2, [3, 4, 5]];
const [b14, b15, ...args] = b2;

console.log("Nested array destructuring:", b14, b15, args);

let x, y, z, z11, x11, y11;
let obj12 = { a: 1, b: 2, c: 3, d: { e: 4 } };
// assign default value if the property doesn't exist
// surround with (), if vaiables declared in the top and destructured somewhere else
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

// concise properies and methods
// if the property name of a object to be same as assignment don't assign one; var obj = {a: a};
var x13 = 1;
var c = "hello";
var obj13 = { x13, b() {}, [c]: 42 }; // computed properties can be put within [] and can be any valid JS expressions

// here concise methods are lexically annoymous, not able to access them

/* TEMPLATE LITERALS */
// Tag functions
function tagFunctions(strings, ...values) {
  console.log("Tag functins accepting values:", strings, values);
}

let total = 200.0;
let fName = "Punith";
tagFunctions`Hello ${fName}, your bill is ${total}`;

/* SYMBOLS */
// new datatype added to JS - Globally unguessable unique value in the context
const symbol1 = Symbol("one"); // optional value, helpful for debugging, name to a symbol, doesn't signify anything
console.log(symbol1.valueOf());

const object1 = { id: 22 };
object1[symbol1] = "Secret data";

console.log("Symbol as property in an object:", object1);
console.log(
  "Symbol not listed when asked for keys:",
  Object.keys(object1),
  "own property names",
  Object.getOwnPropertyNames(object1)
);
// can be accesed using getOwnPropertySymbols mehtod
console.log(
  "Get the symbol properties using:",
  Object.getOwnPropertySymbols(object1)
);

// well known symbols
// Symbol.iterator, Symbol.toStringTag, Symbol.toPrimitive, Symbol.isConcatSpreadable and many more.
var arr1 = [3, 4, 5];
var arrItr = arr1[Symbol.iterator]();
console.log("Using iterator on array:", arrItr.next()); // {value: 3, done: false}

// instead of using iterator manually use, for..of loop
for (let item of arr1) {
  console.log("Usage of for..of:", item);
}

// Plain objects by default are not iterables

// Custom iterables for an object using Symbol.iterator
const object2 = {
  [Symbol.iterator]() {
    let index = this.start;
    let end = this.end;

    let itr = {
      next: () => {
        if (index <= end) {
          let value = this.values[index];
          index++;

          return { value: value, done: false };
        } else {
          return { done: true };
        }
      }
    };

    return itr;
  },
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  start: 4,
  end: 13
};

console.log("Custom object iterator using Symbol.iterator:", [...object2]);

/* GENERATORS */
// Generators doesn't run when executed, it returns an iterator and runs in a paused state
function* main() {
  yield "Hey there";
  yield "Hello";
  yield "Continue after yield";

  return "Last statement";
}
// yield keyword says to pause the generator

let generatorMain = main();
// Call next() method to execute the next available value
console.log(
  "Generator function:",
  generatorMain.next(),
  generatorMain.next(),
  generatorMain.next(),
  generatorMain.next()
);

for (let v of main()) {
  // console.log(v); // it won't consider return values from generators
}

// Random value generator
function* uniqueId() {
  while (true) {
    yield Math.ceil(Math.random() * 100000);
  }
}

const uniqueIdentifier = uniqueId();
console.log(
  "Random id-1:",
  uniqueIdentifier.next().value,
  "\nRandom id-2:",
  uniqueIdentifier.next().value
);

// Custom iterables for an object using Symbol.iterator and generators
const objectGenerator = {
  *[Symbol.iterator]() {
    for (let index = this.start; index <= this.end; index++) {
      yield this.values[index];
    }
  },
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  start: 4,
  end: 10
};

console.log("Custom object iterator using Symbol.iterator and generators:", [
  ...objectGenerator
]);

const numberIteratorBySteps = {
  *[Symbol.iterator]({ start = 0, step = 1, end = 100 } = {}) {
    for (let index = start; index <= end; index = index + step) {
      yield index;
    }
  }
};

for (let v of numberIteratorBySteps) {
  // console.log(v); // Passing nothing prints 1 to 100
}

for (let v of numberIteratorBySteps[Symbol.iterator]({
  start: 40,
  step: 5,
  end: 60
})) {
  console.log(v); // Starts from 40 with a step 5 till 100
}

// Create a custom generator that gerates range of numbers on top of Number prototype
Number.prototype[Symbol.iterator] = function* numberGenerator() {
  for (let index = 0; index <= this; index++) {
    yield index;
  }
};

console.log("Number generator using Generator:", [...5]);