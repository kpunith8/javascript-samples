// Split the array based on size and return the 2-D array
function chunkArrayInGroups(arr, size) {
  let newArr = [];
  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
}

console.log(chunkArrayInGroups(["a", "b", "c", "d"], 3));

// Return the sum of those two numbers plus the sum of all the numbers between them.
// Array passed can be in any order
function sumAll(arr) {
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
}

// function sumAll(arr) {
//   var sum = 0;
//   for (var i = Math.min(...arr); i <= Math.max(...arr); i++) {
//     sum += i;
//   }
//
//   return sum;
// }

// function sumAll(arr) {
//   var sortedArr = arr.sort((a,b) => a-b);
//   var firstNum = arr[0];
//   var lastNum = arr[1];
//
//   // Using Arithmetic Progression summing formula
//   var sum = (lastNum - firstNum + 1) * (firstNum + lastNum) / 2;
//
//   return sum;
// }

// function sumAll(arr) {
//   var max = Math.max(arr[0], arr[1]);
//   var min = Math.min(arr[0], arr[1]);
//   var sum = 0;
//   for (var i = min; i <= max; i++) {
//     sum += i;
//   }

//   return sum;
// }

console.log("sumAll():", sumAll([1, 4]));

// Show the difference between the arrays
function diffArray(arr1, arr2) {
  let arr3 = arr2.filter(item => !arr1.includes(item));
  let arr4 = arr1.filter(item => !arr2.includes(item));

  return [...arr3, ...arr4];
}

console.log(
  "Array Diff:",
  diffArray(
    ["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"],
    ["diorite", "andesite", "grass", "dirt", "dead shrub"]
  )
);

function destroyer(arr) {
  const toBeRemoved = Array.from(arguments);
  // Remove all the values in both the arrays
  return arr.filter(item => !toBeRemoved.includes(item));
}

console.log(
  "Remove the items passed from an array:",
  destroyer(destroyer(["tree", "hamburger", 53], "tree", 53))
);

function whatIsInAName(collection, source) {
  var srcKeys = Object.keys(source);

  return collection.filter(function(obj) {
    return srcKeys.every(function(key) {
      return obj.hasOwnProperty(key) && obj[key] === source[key];
    });
  });
}

console.log(
  whatIsInAName(
    [
      { first: "Romeo", last: "Montague" },
      { first: "Mercutio", last: null },
      { first: "Tybalt", last: "Capulet" }
    ],
    [{ last: "Capulet" }]
  )
);

// Balanced braces

var stack = [];

function checkParentheses(word) {
  var map = {
    "(": ")",
    "[": "]",
    "{": "}"
  };
  for (var i = 0; i < word.length; i++) {
    if (word[i] === "(" || word[i] === "[" || word[i] === "{") {
      stack.push(word[i]);
    } else {
      var last = stack.pop();

      if (word[i] !== map[last]) {
        return false;
      }
    }
  }

  if (stack.length !== 0) {
    return false;
  }

  return true;
}

console.log(checkParentheses("([]{}){}[]"));

// Remove duplicates in a string

let repeatedStr = "abcddsaddals";

console.log("Unique strings using Set:", [...new Set(repeatedStr)].join(""));

// First non repeating char in a given string

// search by indexOf and lastIndex if they match that is the first non-repeated char

const nonRepeatedChar = str => {
  const result = str
    .split("") // split it into array so that we can apply map and filter higher order functions on them
    .filter(char => str.indexOf(char) === str.lastIndexOf(char));
  console.log(`First non-repeated string in '${str}' is: ${result}`);
  // for (let i = 0; i < str.length; i++) {
  //   if (str.indexOf(str.charAt(i)) === str.lastIndexOf(str.charAt(i))) {
  //     return str.charAt(i);
  //   }

  // }
};

nonRepeatedChar("abccdefabde");
nonRepeatedChar("abccadeedbk");
