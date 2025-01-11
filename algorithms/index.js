import * as algos from "./general-algos.js";
import * as recursiveAlgos from "./recursive-algos.js";
import binarySearch from "./binary-search.js";

console.log(
  "chunk arrays as groups",
  algos.chunkArrayInGroups(["a", "b", "c", "d"], 3)
);

console.log("sumAll():", algos.sumAll([1, 4]));

console.log(
  "Array Diff:",
  algos.arrayDiff(
    ["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],
    ["diorite", "andesite", "grass", "dirt", "dead shrub"]
  )
);

console.log("check parantheses", algos.checkParentheses("([]{{}){}[]"));

console.log(
  "First recurring number in an array:",
  algos.firstRecurringNumber([2, 1, 1, 4, 2, 3, 4, 3, 2]),
  algos.firstRecurringNumber([2, 1, 3, 2, 3, 4, 3, 2]),
  algos.firstRecurringNumber([2, 1, 3])
);

algos.nonRepeatedChar("abccdefabde");
algos.nonRepeatedChar("abccadeedbk");

console.log(
  algos.whatIsInAName(
    [
      { first: "Romeo", last: "Montague" },
      { first: "Mercutio", last: null },
      { first: "Tybalt", last: "Capulet" },
    ],
    [{ last: "Capulet" }]
  )
);

console.log(
  "Remove the items passed from an array:",
  algos.destroyer(algos.destroyer(["tree", "hamburger", 53], "tree", 53))
);

console.log(
  "Reverse a string with array:",
  algos.reverseStringArr("Hello Punith")
);

console.log(
  "Reverse a string with lib functions:",
  algos.reverseStringLib("Hello World")
);

console.log(
  "Merged sorted arrays:",
  algos.mergeSortedArrays([1, 3, 4, 55], [4, 11, 44])
);

console.log("Print all the pairs of an array:");
algos.printAllThePairs([1, 2, 3]);

console.log(
  "Common Items in the array: ",
  algos.commonItemsInTheArray([1, 2, 4], [2, 5, 6])
);
console.log(
  "Common Items in the array improved time: ",
  algos.commonItemsInTheArrayImproved([1, 2, 4], [2, 5, 6])
);

console.log(
  "Array has a pair with sum: ",
  algos.hasPairWithSum([6, 4, 3, 1, 2, 7], 7)
);

console.log("number palindrome:", algos.numberPalindrome(121));

console.log(
  "Find all duplicates of an array",
  algos.findAllDuplicatesInArray([1, 2, 3, 4, 5, 3, 2, 1])
);

console.log(
  "Find all duplicates of an array-1",
  algos.findAllDuplicatesInArray1([6, 7, 3, 4, 5, 6, 2, 3])
);

console.log(
  "Convert a number to binary using recurssion:",
  recursiveAlgos.decimalToBinary(10)
); // 1010

console.log(
  "Reverse a string using recurrsion:",
  recursiveAlgos.recursiveReverseString("hello")
); // oello

console.log(
  "Binary search using recursion:",
  binarySearch([2, 5, 9, 11, 14, 25, 28, 32, 77, 99, 220, 442], 0, 12, 9)
);

/* ============== Structy.net problems ============== */

// https://structy.net/problems/token-replace
// Use 2 pointer technique
// O(n) - Space and time complexity
const tokenReplace = (s, tokens) => {
  let result = "";
  let i = 0;
  let j = 1;

  while (i < s.length) {
    if (s[i] !== "$") {
      result += s[i];
      i += 1;
      j = i + 1;
    } else if (s[j] !== "$") {
      j += 1;
    } else {
      const key = s.slice(i, j + 1);
      result += tokens[key];
      i = j + 1;
      j = i + 1;
    }
  }

  return result;
};

const inputString = "Hello, my name is $name$ and I'm $age$ years old.";
const tokens = {
  $name$: "Jane",
  $age$: 30,
};

console.log("tokenReplace:", tokenReplace(inputString, tokens));

// https://structy.net/problems/token-transform
// O(n ^ m) - Space and time complexity
const tokenTransform = (s, tokens) => {
  let result = [];
  let i = 0;
  let j = 1;

  while (i < s.length) {
    if (s[i] !== "$") {
      result.push(s[i]);
      i += 1;
      j = i + 1;
    } else if (s[j] !== "$") {
      j += 1;
    } else {
      const key = s.slice(i, j + 1);
      const value = tokens[key];
      // Use recursion to evaluate the value of the token
      const evaluatedValue = tokenTransform(value, tokens);
      // Storing the evalulated value by mutating the tokens improves execution time
      // We can also make use dynamic programming techique to reduce the memory usage
      tokens[key] = evaluatedValue;
      result.push(evaluatedValue);
      i = j + 1;
      j = i + 1;
    }
  }

  return result.join("");
};

const tokens1 = {
  $1$: "a$2$",
  $2$: "b$3$",
  $3$: "c$4$",
  $4$: "d$5$",
  $5$: "e$6$",
  $6$: "f!",
};

console.log(
  "tokenTransform:",
  tokenTransform("$1$ $1$ $1$ $1$ $1$ $1$ $4$ $4$", tokens1)
);

// Anagrams are strings that contain the same characters, but in any order.
// Time: O(n + m)
// Space: O(n + m)
const anagrams = (s1, s2) => {
  const count = {};

  // Count each character in the first string
  for (let char of s1) {
    if (!count[char]) {
      count[char] = 0;
    }
    count[char] += 1;
  }

  // Decrement by one if the character is present in the second string
  for (let char of s2) {
    if (count[char] === undefined) {
      return false;
    } else {
      count[char] -= 1;
    }
  }

  for (let char in count) {
    if (count[char] !== 0) {
      return false;
    }
  }

  return true;
};

console.log("anagrams:", anagrams("restful", "fluster"));


/* ============= Replit examples ============== */
// Understanding this with arrow functions
// 1. arrow functions do not have their own this binding or prototype and cannot be used as a constructor.
// 2. Arrow functions have lexical this, meaning the value of this is determined by the surrounding scope.
const printNumbers = {
  phrase: 'The current value is:',
  numbers: [1, 2, 3, 4],

  loop() {
    this.numbers.forEach(function(number) {
      console.log(this.phrase, number)
    })
  },
}


printNumbers.loop()
// Above call would return undefined 1, undefined 2 and so on.
// Traditional function will not determine its `this` value from the scope of the environment, which is the printNumbers object.

// To fix this we need to bind the annonymous function passed to forEach as
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

function calculateDiscount(amount, discount, callback) {
  // Callbacks
  if (amount < 0 || discount > 100) {
    callback(
      new Error(
        "amount cannot be less than 0 or discount cannot be greater than 100"
      )
    );
  } else {
    const productDiscount = amount * (discount / 100);
    const promiseResult = new Promise((resolve, reject) => {
      setTimeout(() => resolve(productDiscount), 3000);
    });

    callback(null, promiseResult);
  }
}

calculateDiscount(82, 20, async (err, res) => {
  if (err) throw err;
  console.log("res-1", await res);
});

calculateDiscount(100, 20, async (err, res) => {
  if (err) throw err;
  console.log("res-2", await res);
});

// Custom JS map
function myMap(arr, callback) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(callback(arr[i]));
    callback(arr[i], i, arr);
  }
  return res;
}

const doubleIt = (a) => a * 2;

const doubleArr = myMap([1, 2, 3], doubleIt);

// console.log("double arr", doubleArr);

// const nums = [10, 4, 2, 5, 6]

// const minA = Math.min(...nums); // or Math.min(2,4,2,5,6)

// console.log({ minA })

// Mastering JS Funtional Programming  - Kereki Fedrico

// Classes as first class objects
const makeHelloClass = greeting =>
  class {
    constructor(name) {
      this.name = name
    }

    sayHelloTo(person) {
      console.log(`${this.name} says ${greeting} to ${person}`)
    }
  };

const Spanish = makeHelloClass('Hola')
new Spanish('Roy').sayHelloTo('Mang')

new (makeHelloClass('Hello'))('Roy').sayHelloTo('Mand')

const fullHello = (c, x, y) => new c(x).sayHelloTo(y);
const French = makeHelloClass("BON JOUR");
fullHello(French, "EPSILON", "ZETA");

// Count the total number of occurences of a char in a string
const charCount = (str, char) => str.split(char).length - 1

const charCount1 = (str, chr) => {
  const charMap = {}
  for (const char of str) {
    if (char in charMap) {
      charMap[char] += 1
    } else {
      charMap[char] = 1
    }
  }

  return charMap[chr]
}
console.log('\nChar count:', charCount("Heolllok", 'l'), 'Heolllok'.split('l'), charCount1('my name is namma', 'm'))


// Check if an object is empty
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object

// Get the days between 2 dates
const daysBetween = (date1, date2) => Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

console.log('\nDays between:', daysBetween(new Date('2019-1-9'), new Date('2021-2-9')))

// Shuffle an array
const arrayShuffle = arr => arr.sort(() => 0.5 - Math.random())

// REGEX
// Check password
function checkPassword(password) {
  const oneLowercaseLetter = /(?=.*[a-z])/ // Positive look ahead; use ! for negative look ahead (= should be replaced by !)
  const oneUppercaseLetter = /(?=.*[A-Z])/
  const oneDigit = /(?=.*[0-9])/
  const oneSpecialCharacter = /(?=.*[!@#$%^&*])/
  const minimumEightCharacters = /(?=.{8,})/

  const isValid = oneLowercaseLetter.test(password) &&
    oneUppercaseLetter.test(password) &&
    oneDigit.test(password) &&
    oneSpecialCharacter.test(password) &&
    minimumEightCharacters.test(password)

  return isValid ? 'Your password is valid!' : 'Your password is not valid!'
}

console.log(checkPassword('Pd123#uyt'))
console.log(checkPassword('dd123#uyt'))

// Look behind
// str.match(/(?<=\$)\d+/) // Matches $30 in the string

// Capturing groups and reusing the pattern
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/; // \1 to repeat the capture group
repeatRegex.test(repeatStr); // Returns true
console.log('RegEx capturing groups: Strings:', repeatStr.match(repeatRegex)); // Returns ["regex regex", "regex"]

let repeatNum = "42 42 42";
// Match exactly 3 times, could be any number with a space in between
let reRegex = /^(\d+)\s\1\s\1$/; // Returns ["42 42 42", "42"]
reRegex.test(repeatNum);
console.log('RegEx capturing groups: numbers:', repeatNum.match(reRegex))

// Remove whitespaces from the begining and at the end using regex
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g;
let result = hello.replace(wsRegex, '');
console.log('string without spaces:', result);

// Node's EventEmitter implementation
// Event Emitter class
class EventEmitter {
  eventTypes = {} // {event: [callback1, callback2]}
  on(eventType, callback) {
    if (this.eventTypes[eventType]) {
      return
      // this.eventTypes[eventType] = this.eventTypes[eventType].concat(callback)
    } else {
      this.eventTypes[eventType] = callback
      // this.eventTypes[eventType] = [callback]
    }
  }

  emit(eventType, ...params) {
    this.eventTypes[eventType](...params)
    // this.eventTypes[eventType].forEach(callback => callback(...params))
  }
}

// client code
const em = new EventEmitter();

console.log('\nCustom EventEmitter')
em.on('err', (err, date) => {
  console.log(err, date)
})

// em.on('err', (err, date) => {
//   console.log(err, date)
// })

em.on('success', data => {
  console.log('success!', data)
});

em.emit('err', new Error("Wrong input"), new Date());
em.emit('success', 'Done executing');
// em.emit('success', new Error('error'));
em.emit('success', 'Another success event');



const arr = [[1, 2, 3], [3, 4, 5, 6], [7, 8, 9], [10, 11, 12, 13, 14]]

const read2dArray = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      console.log(arr[i][j])
    }
  }
}

// read2dArray(arr)

const url = require('url')

const dataHandler = (event) => {
  // const {request} = event.Records[0].cf
  // const objectUri = request.uri
  const myURL = new URL(event)

  console.log('myURL', url.parse(event))

  const request = {}
  // Rewrite S3 origin request URIs for objects without a file extension
  if (!event.match(/[^/]\w+\.\w+$/)) {
    console.log(`Rewriting ${event} to /index.html.`)
    request.uri = '/index.html'
  }

  return request
}

// console.log('dataHandler:', dataHandler('https://hello.com/new-ui?email=test'))

// let aa = [1, 2, 3]

// console.log(aa.shift(), aa)

// for (let [i, j] of [1, 2, 3].entries()) {
//   console.log('for..of', i, j)
// }

// Chaining methods with callbacks, onSuccess => then and onError => catch in the promises API
class Animal {
  makesSound = ''
  name = ''
  error = ''
  sounds = {
    dog: 'Bark...',
    cat: 'Meow...'
  }

  constructor(name) {
    this.name = name
  }

  onSuccess(successCallback) {
    if (this.name) {
      this.makesSound = `I'm a ${this.name} and I ${this.sounds[this.name.toLowerCase()]}`
      successCallback(this.makesSound)
    }
    return this
  }

  // Expecting onError to be called at the end, hence not returning 'this', not allowing to chain on onError method
  onError(errorCallback) {
    if (!this.name) {
      this.error = new Error('Please enter a animal name, (cat or dog)')
      errorCallback(this.error)
    }
  }
};

const dog = new Animal()

dog.onSuccess(res => console.log(res)).onError(err => console.log('Error loading animal: ', err.message))

const cat = new Animal('cat')

cat.onSuccess(res => console.log(res)).onError(err => console.log('Error loading animal: ', err.message))

// TODO: Forward networks interview question
/*
Implement a function memoize that memorizes a function by caching the result computed by that function. It's a commonly used technique for speeding up computations. Your implementation should satisfy the following requirements.

memoize should work on functions with an arbitrary number of arguments of arbitrary types, including primitives, arrays and objects. For example, it should work on all these functions:

function add(x, y) {
  return x + y;
}

function trim(str) {
  return str.trim();
}

function merge(arrA, arrB) {
  return [...arrA, ...arrB];
}


Only result from the most recent invocation is cached. For example:

function square(x) {
  return x * x;
}

const memoizedSquare = memoize(square);

memoizedSquare(1); // from computation
memoizedSquare(1); // from cache
memoizedSquare(2); // from computation
memoizedSquare(2); // from cache
memoizedSquare(1); // from computation


The memoized function has a method .clear() that clears the cached result.

memoizedSquare(3); // from computation
memoizedSquare(3); // from cache
memoizedSquare.clear();
memoizedSquare(3); // from computation


Non-primitive arguments are compared by deep equality instead of referential equality. For example, {a: 1, b: 2} and {b: 2, a: 1} should be considered equal.

function compare(obj) {
  return obj.a > obj.b;
}

const memoizedCompare = memoize(compare);

memoizedCompare({a: 1, b: 2}); // from computation
memoizedCompare({a: 1, b: 2}); // from cache
memoizedCompare({b: 2, a: 1}); // from cache
*/
function memoize(func) {
  // we can use the object for storing the results in the cache
  // using map to story they key as objects better lookup
  const cache = new Map()

 // Sorting the keys of an object so that a single key can be used
 // to cache the data even if order of the keys are different
  function sortObjectKeys(args) {
    if (typeof args === 'object') {
      return Object.keys(args).sort().reduce((acc, key) => {
        acc[key] = args[key]
        return acc
      }, {})
    }
    return args
  }

  function memoizedFunction(...args) {
    const key = JSON.stringify(sortObjectKeys(...args))
    const result = func(...args)

     if (cache.has(key)) {
        console.log('from cache')
        return cache.get(key)
     }
    cache.set(key, result)
    console.log('from computation')
    return result
  }

  memoizedFunction.clear = function() {
    cache.clear()
  }

  return memoizedFunction
}

// ==============================
// Test suite #1 - Only most recent result is memoized

function square(x) {
  console.log(`computing ${x} * ${x}`);
  return x * x;
}

const memoizedSquare = memoize(square);

memoizedSquare(1); // from computation
memoizedSquare(1); // from cache
memoizedSquare(2); // from computation
memoizedSquare(2); // from cache
memoizedSquare(1); // from computation


// ==============================
// Test suite #2 - Can clear memoized result
// 2. Can clear memoized result

memoizedSquare(3); // from computation
memoizedSquare(3); // from cache
memoizedSquare.clear();
memoizedSquare(3); // from computation


// ==============================
// Test suite #3 - Works with arbitrary number of arguments (4 in this example)

function sum(a, b, c, d) {
  console.log(`computing ${a} + ${b} + ${c} + ${d}`);
  return a + b + c + d;
}

const memoizedSum = memoize(sum);

memoizedSum(1, 2, 3, 4); // from computation
memoizedSum(1, 2, 3, 4); // from cache
memoizedSum(2, 1, 3, 4); // from computation

// ==============================
// Test suite #4 - Non-primitive arguments are compared by deep equality

function compare(obj) {
  console.log(`comparing ${obj.a} and ${obj.b}`);
  return obj.a > obj.b;
}

const memoizedCompare = memoize(compare);

memoizedCompare({a: 1, b: 2}); // from computation
memoizedCompare({a: 1, b: 2}); // from cache
memoizedCompare({b: 2, a: 1}); // from cache
memoizedCompare({b: 3, a: 1}); // from computation

// NOTE: I'm not able to submit the results, I just ran the test cases
// looks like the expected output is matching what is expecte, I'm not so sure
// there were multiple questions part of this interview.
