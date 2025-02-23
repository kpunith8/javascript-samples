// Split the array based on size and return the 2-D array
export const chunkArrayInGroups = (arr, size) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
};

// Return the sum of those two numbers plus the sum of all the numbers between them.
// Array passed can be in any order
export const sumAll = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let betweenNumbers = [];
  let numbersToBeGenerated = Math.max(...arr) - Math.min(...arr) - 1; //sortedArr[sortedArr.length - 1] - sortedArr[0] - 1;
  let newNumber = sortedArr[0];

  for (let i = 0; i < numbersToBeGenerated; i++) {
    betweenNumbers.push(newNumber + 1);
    newNumber += 1;
  }
  const sumOfAll = arr
    .concat(betweenNumbers)
    .reduce((prev, next) => prev + next, 0);

  return sumOfAll;
};

// export const sumAll = arr => {
//   var sum = 0;
//   for (var i = Math.min(...arr); i <= Math.max(...arr); i++) {
//     sum += i;
//   }
//
//   return sum;
// }

// export const sumAll = arr => {
//   var sortedArr = arr.sort((a,b) => a-b);
//   var firstNum = arr[0];
//   var lastNum = arr[1];
//
//   // Using Arithmetic Progression summing formula
//   var sum = (lastNum - firstNum + 1) * (firstNum + lastNum) / 2;
//
//   return sum;
// }

// export const sumAll = arr => {
//   var max = Math.max(arr[0], arr[1]);
//   var min = Math.min(arr[0], arr[1]);
//   var sum = 0;
//   for (var i = min; i <= max; i++) {
//     sum += i;
//   }

//   return sum;
// }

// Find the difference between the arrays
export const arrayDiff = (arr1, arr2) =>
  arr1.filter((item) => !arr2.includes(item));

export function destroyer(arr) {
  // arguments is not available when you use arrow functions
  const toBeRemoved = Array.from(arguments);
  // Remove all the values in both the arrays
  return arr.filter((item) => !toBeRemoved.includes(item));
}

export const whatIsInAName = (collection, source) => {
  var srcKeys = Object.keys(source);

  return collection.filter(function (obj) {
    return srcKeys.every(function (key) {
      return obj.hasOwnProperty(key) && obj[key] === source[key];
    });
  });
};

// Balanced braces
let stack = [];

export const checkParentheses = (word) => {
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (var i = 0; i < word.length; i++) {
    if (word[i] === "(" || word[i] === "[" || word[i] === "{") {
      stack.push(word[i]);
    } else {
      const last = stack.pop();

      if (word[i] !== map[last]) {
        return false;
      }
    }
  }

  if (stack.length !== 0) {
    return false;
  }

  return true;
};

// Remove duplicates in a string

// let repeatedStr = "abcddsaddals";

// console.log("Unique strings using Set:", [...new Set(repeatedStr)].join(""));

// First non repeating char in a given string
// search by indexOf and lastIndex if they match that is the first non-repeated char
export const nonRepeatedChar = (str) => {
  const result = str
    .split("") // split it into array so that we can apply filter function on it
    .filter((char) => str.indexOf(char) === str.lastIndexOf(char));
  // console.log(`First non-repeated string in '${str}' is: ${result}`);
  // for (let i = 0; i < str.length; i++) {
  //   if (str.indexOf(str.charAt(i)) === str.lastIndexOf(str.charAt(i))) {
  //     return str.charAt(i);
  //   }
  // }
  return result;
};

// google interview question with O(n) complexity
export const firstRecurringNumber = (input) => {
  const map = {};

  for (let i = 0; i < input.length; i++) {
    if (map[input[i]] !== undefined) {
      return input[i];
    } else {
      map[input[i]] = i;
    }
  }
};

// With O(n^2) complexity
export const firstRecurringNumberImperitive = (input) => {
  const map = {};

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; i++) {
      if (input[i] === input[j]) {
        return input[i];
      }
    }
  }
  return undefined;
};

/* Reverse a string */
export const reverseStringArr = (str) => {
  if (!str || typeof str !== "string") {
    return;
  }
  if (str.length < 2) {
    return str;
  }

  const reversedArray = [];
  const totalItems = str.length - 1;
  for (let i = totalItems; i >= 0; i--) {
    reversedArray.push(str[i]);
  }

  return reversedArray.join("");
};

export const reverseStringLib = (str) => {
  // return [...str].reverse().join('') // with destructuring
  return str.split("").reverse().join("");
};

/* Merge sorted arrays */
export const mergeSortedArrays = (arr1, arr2) => {
  let mergedArray = [];
  let array1Item = arr1[0];
  let array2Item = arr2[0];
  let i = 1;
  let j = 1;

  if (!arr1 || !arr2) {
    return;
  }

  if (arr1.length === 0) {
    return arr2;
  }

  if (arr2.length === 0) {
    return arr1;
  }

  while (array1Item || array2Item) {
    if (!array2Item || array1Item < array2Item) {
      mergedArray = [...mergedArray, array1Item];
      array1Item = arr1[i];
      i++;
    } else {
      mergedArray = [...mergedArray, array2Item];
      array2Item = arr2[j];
      j++;
    }
  }

  return mergedArray;
};

// Log all the pairs of an array
// for an array, a = [1,2,3] => [1,1], [1,2], [1,3], [2, 1], [2, 2], [2, 3] and son on
export const printAllThePairs = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // For non-repeating pair for eg., [1, 2] and [2, 1] are start second loop from index i + 1,
    // to print each and every pair, start from index 0
    for (let j = 0; j < arr.length; j++) {
      console.log([arr[i], arr[j]]);
    }
  }
};

// If it has length > 1 we can say they have the common item in them
export const commonItemsInTheArray = (arr1, arr2) => {
  // for(let i = 0; i < arr1.length; i++) {
  //   for(let j = 0; j < arr2.length; j++) {
  //     if(arr1[i] === arr2[j]) {
  //       return true; // Or return the item from either of the array
  //     }
  //   }
  // }
  // Takes O(n^2) time because it loops over each items
  return arr1.filter((item) => arr2.includes(item));
};

// Convert the first arr to a object and compare with object properties
// of obj with arr2, so that it would reduce the time by O(n + m)
// Object lookup will take constant time of O(1)
export const commonItemsInTheArrayImproved = (arr1, arr2) => {
  const arrayToObj = {};
  let commonItemFound = false;
  arr1.forEach((item) => {
    if (!arrayToObj[item]) {
      arrayToObj[item] = true;
    }
  });

  arr2.forEach((item) => {
    if (arrayToObj[item]) {
      commonItemFound = true;
    }
  });
  return commonItemFound;
};

// return true if an array pair is equal to sum
// arr = [1,2,3,4,5], sum = 9 => true
export const hasPairWithSum = (arr, sum) => {
  const resultSet = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (resultSet.has(arr[i])) {
      return true;
    }
    resultSet.add(sum - arr[i]);
  }
  return false;
};

// strings: ['abc', 'cc', 'c', 'cc', 'abc'] queries: ['abc', 'cc']
// output: [2, 0] => Frequency of query strings found in the string
function matchingStrings(strings, queries) {
  const res = [];
  for (let i = 0; i < queries.length; i++) {
    let count = 0;

    strings.map((str) => {
      if (str === queries[i]) {
        count++;
      }

      res[i] = count;
    });
  }

  return res;
}

export const numberPalindrome = (num) => {
  let actualNum = num;
  let remainder;
  let reversedNumber = 0;

  while (num > 0) {
    remainder = num % 10;
    reversedNumber = reversedNumber * 10 + remainder;
    num = parseInt(num / 10);
  }

  return actualNum === reversedNumber;
};

export const findAllDuplicatesInArray = (arr) => {
  const set = new Set();
  const duplicates = [];

  arr.forEach((item) => {
    if (set.has(item)) {
      duplicates.push(item);
    } else {
      set.add(item);
    }
  });

  return duplicates;
};

export const findAllDuplicatesInArray1 = (arr) => {
  const duplicates = [];
  const uniqueItems = {};

  arr.forEach((item) => {
    if (uniqueItems[item]) {
      duplicates.push(item);
    } else {
      uniqueItems[item] = true;
    }
  });

  return duplicates;
};

// Rotate a 2D a array 90 degrees clockwise
const rotateImage = (array) => {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const temp = array[i][j];
      array[i][j] = array[j][i];
      array[j][i] = temp;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      const temp = array[i][j];
      array[i][j] = array[i][n - 1 - j];
      array[i][n - 1 - j] = temp;
    }
  }

  return array;
};

const arrayTranspose = (array) => {
  const n = array.length;
  const result = [];
  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      result[i][j] = array[j][i];
    }
  }
  return result;
};

const arr1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const rotatedArray = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
];

console.log("transpose of an array", arrayTranspose(arr1));

console.log("Rotate an image", rotateImage(arr1));

// [-6, -4, -1, 1, 2, 5] => [1, 1, 4, 16, 25, 36]
const sortedSquaredArray = (arr) => {
  const result = [];
  let left = 0;
  let right = arr.length - 1;

  // Keep 2 pointers, one at the start and one at the end
  // If the absolute value of the element at the start is greater than the element at the end, put the squared value to the end
  for (let i = arr.length - 1; i >= 0; i--) {
    if (Math.abs(arr[left]) > arr[right]) {
      result[i] = arr[left] * arr[left];
      left++;
    } else {
      result[i] = arr[right] * arr[right];
      right--;
    }
  }

  return result;
};

console.log("Sorted squared array", sortedSquaredArray([-6, -4, -1, 1, 2, 5]));

// sum of two numbers in 2 arrays, takes O(a + b) time
const sumOfTwoNumbers = (arr1, arr2, target) => {
  const match = {};
  for (let i = 0; i < arr1.length; i++) {
    const diff = target - arr1[i];
    match[diff] = diff;
  }

  for (let j = 0; j < arr2.length; j++) {
    if (match[arr2[j]]) {
      return true;
    }
  }

  return false;
};
// Another solution would be looping through both arrays, that could take O(n^2) time

console.log(
  "sumOfTwoNumbers:",
  sumOfTwoNumbers([1, 2, 3, 4, 5], [2, 3, 4, 5, 6], 8)
);

// Kadan's algorithm
// Maxium sum of contiguous subarray
const maxSubArray = (arr) => {
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};

console.log(
  "maximum sum of contiguous array:",
  maxSubArray([-2, 2, 5, -11, 6])
); // [2, 5] => 7

/* ============= Replit examples ============== */
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

printNumbers.loop();
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
const makeHelloClass = (greeting) =>
  class {
    constructor(name) {
      this.name = name;
    }

    sayHelloTo(person) {
      console.log(`${this.name} says ${greeting} to ${person}`);
    }
  };

const Spanish = makeHelloClass("Hola");
new Spanish("Roy").sayHelloTo("Mang");

new (makeHelloClass("Hello"))("Roy").sayHelloTo("Mand");

const fullHello = (c, x, y) => new c(x).sayHelloTo(y);
const French = makeHelloClass("BON JOUR");
fullHello(French, "EPSILON", "ZETA");

// Count the total number of occurences of a char in a string
const charCount = (str, char) => str.split(char).length - 1;

const charCount1 = (str, chr) => {
  const charMap = {};
  for (const char of str) {
    if (char in charMap) {
      charMap[char] += 1;
    } else {
      charMap[char] = 1;
    }
  }

  return charMap[chr];
};
console.log(
  "\nChar count:",
  charCount("Heolllok", "l"),
  "Heolllok".split("l"),
  charCount1("my name is namma", "m")
);

// Check if an object is empty
const isEmpty = (obj) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

// Get the days between 2 dates
const daysBetween = (date1, date2) =>
  Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

console.log(
  "\nDays between:",
  daysBetween(new Date("2019-1-9"), new Date("2021-2-9"))
);

// Shuffle an array
const arrayShuffle = (arr) => arr.sort(() => 0.5 - Math.random());

// REGEX
// Check password
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

// Remove whitespaces from the begining and at the end using regex
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g;
let result = hello.replace(wsRegex, "");
console.log("string without spaces:", result);

// Node's EventEmitter implementation
// Event Emitter class
class EventEmitter {
  eventTypes = {}; // {event: [callback1, callback2]}
  on(eventType, callback) {
    if (this.eventTypes[eventType]) {
      return;
      // this.eventTypes[eventType] = this.eventTypes[eventType].concat(callback)
    } else {
      this.eventTypes[eventType] = callback;
      // this.eventTypes[eventType] = [callback]
    }
  }

  emit(eventType, ...params) {
    this.eventTypes[eventType](...params);
    // this.eventTypes[eventType].forEach(callback => callback(...params))
  }
}

// client code
const em = new EventEmitter();

console.log("\nCustom EventEmitter");
em.on("err", (err, date) => {
  console.log(err, date);
});

// em.on('err', (err, date) => {
//   console.log(err, date)
// })

em.on("success", (data) => {
  console.log("success!", data);
});

em.emit("err", new Error("Wrong input"), new Date());
em.emit("success", "Done executing");
// em.emit('success', new Error('error'));
em.emit("success", "Another success event");

const arr = [
  [1, 2, 3],
  [3, 4, 5, 6],
  [7, 8, 9],
  [10, 11, 12, 13, 14],
];

const read2dArray = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      console.log(arr[i][j]);
    }
  }
};

// read2dArray(arr)

const url = require("url");

const dataHandler = (event) => {
  // const {request} = event.Records[0].cf
  // const objectUri = request.uri
  const myURL = new URL(event);

  console.log("myURL", url.parse(event));

  const request = {};
  // Rewrite S3 origin request URIs for objects without a file extension
  if (!event.match(/[^/]\w+\.\w+$/)) {
    console.log(`Rewriting ${event} to /index.html.`);
    request.uri = "/index.html";
  }

  return request;
};

// console.log('dataHandler:', dataHandler('https://hello.com/new-ui?email=test'))

// let aa = [1, 2, 3]

// console.log(aa.shift(), aa)

// for (let [i, j] of [1, 2, 3].entries()) {
//   console.log('for..of', i, j)
// }

// Chaining methods with callbacks, onSuccess => then and onError => catch in the promises API
class Animal {
  makesSound = "";
  name = "";
  error = "";
  sounds = {
    dog: "Bark...",
    cat: "Meow...",
  };

  constructor(name) {
    this.name = name;
  }

  onSuccess(successCallback) {
    if (this.name) {
      this.makesSound = `I'm a ${this.name} and I ${
        this.sounds[this.name.toLowerCase()]
      }`;
      successCallback(this.makesSound);
    }
    return this;
  }

  // Expecting onError to be called at the end, hence not returning 'this', not allowing to chain on onError method
  onError(errorCallback) {
    if (!this.name) {
      this.error = new Error("Please enter a animal name, (cat or dog)");
      errorCallback(this.error);
    }
  }
}

const dog = new Animal();

dog
  .onSuccess((res) => console.log(res))
  .onError((err) => console.log("Error loading animal: ", err.message));

const cat = new Animal("cat");

cat
  .onSuccess((res) => console.log(res))
  .onError((err) => console.log("Error loading animal: ", err.message));
