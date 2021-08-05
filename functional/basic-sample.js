/* 1. Functional programming: you don't know JS: Kyle Simpson */

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
const es6Compose =
  (fn1, fn2) =>
  (...args) =>
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
// a[1] = 20; // not allowed
a[3][0] = 10; // allowed, nested array can not be frozen hence can be updated

console.log("Mutating the nested array when Object.freeze() called:", a);

/* CLOSURE */
// Closure is when a function remembers the variable around that when that function is executed elsewhere.

const sumX = (x) => (y) => x + y;

const add10 = sumX(10);
console.log("Closure sample1:", add10(10));
console.log("Closure sample2:", add10(22));

/* RECURSION */
// base case which stops the recursion
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

// HOF - Function that can take function as an argument or return a function
const hof = (fn) => (x) => fn(x);
function aa(x) {
  return x;
}

console.log("HOF:", hof(aa)(4));

// currying - function taking one param at a time, eg: fun(a)(b)(c)
const multiplyCurry = (a) => (b) => a * b;

console.log("Multiply with currying:", multiplyCurry(5)(4));

// Partial application - Pass all the params when invoked second time
const multiply = (a, b, c) => a * b * c;
const partialMultiplyBy5 = multiply.bind(null, 5);
console.log("Multiply with partial application:", partialMultiplyBy5(5, 5));

// Memorization === caching
function memoizeAddTo80() {
  let cache = {}; // Use closure to avoid polluting global name space
  return function (n) {
    if (n in cache) {
      console.log(`Value exists, getting from cache`);
      return cache[n];
    } else {
      console.log(`Value doesn't exist, adding to cache`);
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

const memoizedFunction = memoizeAddTo80();
console.log(memoizedFunction(10));
console.log(memoizedFunction(15));
console.log(memoizedFunction(10));

// Compose and pipe
const multiplyBy3 = (n) => 3 * n;
const makePositive = (n) => Math.abs(n);

// Right to Left
const compose1 = (f, g) => (data) => f(g(data));
const multiplyBy3AndAbsolute = compose1(multiplyBy3, makePositive);

console.log("Compose 2 functions:", multiplyBy3AndAbsolute(-49));

// Pipe - left to right
const pipe = (f, g) => (data) => g(f(data));

/**
 * fn1(fn2(fn3(50)))
 *
 * compose(fn1, fn2, fn3)(50)
 * pipe(fn3, fn2, fn1)(50)
 */

// arity - Number of arguments that a function takes

// Shopping cart with FP
const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};

// 1. Add items to cart
// 2. Add 5% tax to items in the cart
// 3. Buy Item: cart -> purchases
// 4. Empty cart

// Generic compose takes multiple functions
const composeCart =
  (f, g) =>
  (...args) =>
    f(g(...args));

// compose to apply the functions from right to left
function purchaseItem1(...fns) {
  return fns.reduceRight(composeCart);
}

console.log(
  "PurchaseItem using reduceRight:",
  purchaseItem1(
    addItemToCart,
    applyTaxToItems,
    buyItem,
    emptyCart
  )(user, { name: "laptop", price: 40000 })
);

console.log(
  "PurchaseItem using reduce:",
  purchaseItem(
    emptyCart,
    buyItem,
    applyTaxToItems,
    addItemToCart
  )(user, { name: "laptop", price: 40000 })
);

// Takes more than 2 functions, one described above in the example is meant only for
// 2 functions, reduce can be applied to take as many functions as it wants
function purchaseItem(...fns) {
  return fns.reduce(composeCart);
}

function addItemToCart(user, item) {
  const updatedItem = user.cart.concat(item);

  return { ...user, cart: updatedItem };
}

function applyTaxToItems(user) {
  const { cart } = user;
  const taxRate = 0.05;
  const updatedItem = cart.map((item) => ({
    name: item.name,
    price: item.price + item.price * taxRate,
  }));
  return { ...user, cart: updatedItem };
}

function buyItem(user) {
  return { ...user, purchases: user.cart };
}

function emptyCart(user) {
  return { ...user, cart: [] };
}

/*
 * ---------------------------------------------------------------
 *  FP                             | OOP
 * ---------------------------------------------------------------
 * Many operations on fixed data   | Few operations on common data
 * Stateless 										   | Statefull
 * Pure function (no side effects) | Side effects
 * Declarative	style							 | Imperative style
 */
