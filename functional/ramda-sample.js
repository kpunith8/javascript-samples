const R = require("ramda");

const arr1 = [2, 5, 8, 19, 32];

console.log("Actual array", arr1);
// Ramba accepts source as second parameter, action to be performed as first paramter.
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

// `both()` takes two other functions and returns a new function that returns `true`
// if `both()` functions return a truthy value when applied to the arguments and `false` otherwise.

// `either()` takes two other functions and returns a new function that returns `true`
// if `either()` function returns a truthy value when applied to the arguments and `false` otherwise.

// R.both(isEven, isGreaterThan5)
// R.either(isEven, isGreaterThan5)

console.log("both():", R.filter(R.both(isEven, isGreatherThan5), arr1));

// Ramda also provides `allPass()` and `anyPass()` that take an array of any number of functions.
// As their names suggest, `allPass()` works like `both()`, and `anyPass()` works like `either`.

// Ramda provides the `pipe()` function, which takes a list of one or more functions and returns a new function.
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

// 'compose()' works exactly the same way as `pipe()`,
// except that it applies the functions in `right-to-left` order instead of left-to-right
const operateCompose = R.compose(
  square,
  addOne,
  multiply
);

console.log("Using compose():", operateCompose(4, 5));

// Partial applications
const books = [
  {
    title: "book-1",
    year: 2000
  },
  {
    title: "book-2",
    year: 2001
  },
  {
    title: "book-3",
    year: 2000
  },
  {
    title: "book-4",
    year: 2001
  }
];

/* Without using partial */
// const publishedInYear = (book, year) => book.year === year;

// const titlesForYear = (books, year) => {
//   const selected = R.filter(book => publishedInYear(book, year), books);

//   return R.map(book => book.title, selected);
// };

// This can also be written as higher order function to pass one param instead of multiple to filter
// here `filter()` wants a function accepting a param, in this case book and checks for the both condition
/*
const publishedInYear = year => book => book.year === year;

const titlesForYear = (books, year) => {
  const selected = R.filter(publishedInYear(year), books)
 
  return R.map(book => book.title, selected)
}
*/

/*
`partial()` and `partialRight()`

These two functions let us call any function with fewer arguments than it needs. 
They both return a new function that takes the missing arguments and then calls the 
original function once all of the arguments have been supplied.

The difference between `partial()` and `partialRight()` is whether the arguments 
we supply are the left-most or right-most arguments needed by the original function.
*/

// Above example can be written using `partialRight()` as follows
const publishedInYear = (book, year) => book.year === year;

const titlesForYear = (books, year) => {
  // Would have used partial if the param to publichedInYear() are reversed
  const selected = R.filter(R.partialRight(publishedInYear, [year]), books);

  return R.map(book => book.title, selected);
};

// Note that the arguments we supply to partial and partialRight must always be in an array, even if there’s only one of them

console.log("Books filtered for year 2001:", titlesForYear(books, 2000));

// CURRYING
// A curried function is always a series of single-argument functions.
// In Ramda, a curried function can be called with only a subset of its arguments,
// and it will return a new function that accepts the remaining arguments.
// If you call a curried function with all of its arguments, it will call just call the function.

// Notice that to make `curry()` work, reverse the argument order
/*
const publishedInYear = R.curry((year, book) => book.year === year)
 
const titlesForYear = (books, year) => {
  const selected = R.filter(publishedInYear(year), books)
 
  return R.map(book => book.title, selected)
}
*/

/*
placeholder: (__)

What if we have a curried function of three arguments, 
and we want to supply the first and last arguments, leaving the middle one for later? 
We can use the placeholder for the middle argument:
*/
/*
const publishedInYear = R.curry((book, year) => book.year === year)
 
const titlesForYear = (books, year) => {
  const selected = R.filter(publishedInYear(__, year), books)
 
  return R.map(book => book.title, selected)
}
*/

// using `pipe()` to filter the books

/*
const publishedInYear = R.curry((year, book) => book.year === year);

const titlesForYear = (books, year) =>
  R.pipe(
    R.filter(publishedInYear(year)),
    R.map(book => book.title)
  )(books);
 */

// const forever21 = age => age >= 21 ? 21 : age + 1
// same can be written using Ramda built-in functions

const forever21 = age => R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)(age);

console.log("Usage of always(), inc():", forever21(18));

// const alwaysDrivingAge = age => R.ifElse(lt(R.__, 16), R.always(16), a => a)(age);

// Instead of returning a => a make use of `identity()` function.
// const alwaysDrivingAge = age => R.ifElse(R.lt(R.__, 16), R.always(16), R.identity)(age);
const alwaysDrivingAge = age => R.when(R.lt(R.__, 16), R.always(16))(age);

// Use `unless()` when you change it to, `gte()`
const alwaysDrivingAgeUnless = age =>
  R.unless(R.gte(R.__, 16), R.always(16))(age);

// Ramda also provides `T` and `F` as further shortcuts for `always(true)` and `always(false)`

console.log("using when():", alwaysDrivingAge(12));
console.log("using unless():", alwaysDrivingAgeUnless(11));

const settings = {};
// const lineWidth = settings.lineWidth || 80;
const lineWidth = R.defaultTo(80, settings.lineWidth);
console.log("Usage of defaultTo():", lineWidth);

// `equals()`, `lte()`, `inc()` `sum()` other built-in methods for calculation
const water = temperature =>
  R.cond([
    [R.equals(0), R.always("water freezes at 0°C")],
    [R.equals(100), R.always("water boils at 100°C")],
    [R.T, temp => `nothing special happens at ${temp}°C`]
  ])(temperature);

console.log("Using cond(), acts like switch:", water(0));
