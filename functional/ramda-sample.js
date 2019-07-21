const R = require("ramda");

const arr1 = [2, 5, 8, 19, 32];

console.log("Actual array", arr1);
// Ramba accepts source as second paramente, action to be performed as first paramter
console.log("map():", R.map(x => x + 2, arr1));

const isEven = x => x % 2 === 0;
const isOdd = R.complement(isEven);
const isGreatherThan5 = x => x > 5;

console.log("reject():", R.reject(isEven, arr1));
console.log("filter():", R.filter(isEven, arr1));

console.log(
  "complement(): first odd element using complement(chaining):",
  R.find(isOdd, arr1)
);

// `both` takes two other functions and returns a new function that returns `true`
// if both functions return a truthy value when applied to the arguments and `false` otherwise.

// `either` takes two other functions and returns a new function that returns `true`
// if either function returns a truthy value when applied to the arguments and `false` otherwise.

// R.both(isEven, isGreaterThan5)
// R.either(isEven, isGreaterThan5)

console.log("both():", R.filter(R.both(isEven, isGreatherThan5), arr1));

// Ramda also provides `allPass` and `anyPass` that take an array of any number of functions.
// As their names suggest, `allPass` works like `both`, and `anyPass` works like `either`.

// Ramda provides the `pipe` function, which takes a list of one or more functions and returns a new function.
// functions after the first must only take a single argument.

const multiply = (a, b) => a * b;
const addOne = x => x + 1;
const square = x => x * x;

const operate = (x, y) => {
  const product = multiply(x, y);
  const incremented = addOne(product);
  const squared = square(incremented);

  return squared;
};

console.log("Without using pipe():", operate(3, 4));

const operatePipe = R.pipe(
  multiply,
  addOne,
  square
);

console.log("Using pipe():", operatePipe(3, 4));

// Composing
// const operate = (x, y) => square(addOne(multiply(x, y)))

// 'compose' works exactly the same way as pipe, except that it applies the functions in `right-to-left` order instead of left-to-right
const operateCompose = R.compose(
  square,
  addOne,
  multiply
);

console.log("Using compose():", operateCompose(4, 5));
