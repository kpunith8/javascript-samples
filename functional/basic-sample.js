/* Functional programming: you dont know JS: Kyle Simpson */

/* IMPURE FUNCTION */
// side effects
// Changes the value of y and z
function foo(x) {
  y = x * 2;
  z = y * 10;
}

var y, z;

foo(5);

console.log("Impure functions:", y, z);

/* PURE FUNCTION */
// no side effects
function pureFoo(x, y, z) {
  foo1();
  return [y, z];

  function foo1() {
    y = y * x;
    z = y * x;
  }
}

console.log("Pure functions:", pureFoo(6, 2, 3));

/* COMPOSITION: */
// output of a function can be passed as an input to the other function
function compose(fn1, fn2) {
  return function comp() {
    var args = Array.from(arguments); // [].slice.call(arguments);
    return fn2(fn1(args.shift(), args.shift()), args.shift());
  };
}

// using ES6
const es6Compose = (fn1, fn2) => (...args) =>
  fn2(fn1(args.shift(), args.shift()), args.shift());

function sum(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
}

const addAndMultiply = es6Compose(mul, sum);

console.log("Using compose utility:", addAndMultiply(5, 6, 7));

/* IMMUTABILITY */
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
a[3][0] = 10; // allowed, nested array can not be frozen to change

console.log("Mutating the nested array when Object.freeze() called:", a);

/* CLOSURE */
// Closure is when a function remembers the variable around that when that function is executed elsewhere.

const sumX = x => y => x + y;

const add10 = sumX(10);
console.log("Closure sample1:", add10(10));
console.log("Closure sample2:", add10(22));

/* RECURRSION */
// base case which stops the recurrsion
// Function invokes itself when called
// Tail call optimizations

// reduce() custom implementation
const add = (a, b) => a + b;

function reduce(arr, fn, initialValue) {
  let total = initialValue;
  for (let value of arr) {
    total = fn(total, value);
  }

  return total;
}

console.log("Custom reduce():", reduce([1, 2, 3, 4, 5], add, 1));
