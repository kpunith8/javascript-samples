const _ = require("lodash");

// _.chunk(array, [size=1]) - Creates an array of elements split into groups the length of size.
// If array can't be split evenly, the final chunk will be the remaining elements.
// If the size not passed default set to 1

console.log(`_.chunk([1, 2, 3, 4, 5, 6], 4)):`, _.chunk([1, 2, 3, 4, 5, 6], 4));

// _.compact(array) - Creates an array with all falsey values removed.
// The values false, null, 0, "", undefined, and NaN are falsey.

console.log(
  `_.compact([0, 1, false, 2, "", 3]):`,
  _.compact([0, 1, false, 2, "", 3])
);

// _.concat(array, [values]) ex: concat([1], [2], [[4]]); returns [1, 2, [4]]

// _.difference(array, [values]) - Creates an array of array values not included in the other given arrays using
// http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero for equality comparisons.
// The order and references of result values are determined by the first array.

console.log(`_.difference([2, 1], [2, 3]):`, _.difference([2, 1], [2, 3]));

// Check for differenceBy() and DifferenceWith() in official documentation

// _.drop(array, [n=1]) - Creates a slice of array with n elements dropped from the beginning.

console.log(`_.drop([1, 2, 3]):`, _.drop([1, 2, 3]));

/*
_.drop([1, 2, 3], 2); // drop 2 elements
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
*/

// _.dropRight(array, [n=1]) - Drop from right

/*
_.dropRightWhile(array, [predicate=_.identity])

Creates a slice of array excluding elements dropped from the end. 
Elements are dropped until predicate returns falsey. 
The predicate is invoked with three arguments: (value, index, array).
*/

var users = [
  { name: "barney", isActive: true },
  { name: "fred", isActive: false },
  { name: "pebbles", isActive: false }
];

console.log(
  `_.dropRightWhile():`,
  _.dropRightWhile(users, user => !user.isActive)
);
// => objects for ['barney']

// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { name: "pebbles", isActive: false });
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ["isActive", false]);
// => objects for ['barney']

// The `_.property` iteratee shorthand.
_.dropRightWhile(users, "isActive");
// => objects for ['barney', 'fred', 'pebbles']

// check _.dropWhile() // drop from the begining

let obj = {data: '123', name: 'Punith'};
let obj1 = {place: 'Bangalore', pin: 12233};

console.log(`final obj:`, {...{obj, obj1}});