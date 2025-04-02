// List of algorithms to practice
/*
Prefix Sum
303. Range Sum Query - Immutable
525. Contiguous Array
560. Subarray Sum Equals K

Two Pointers
167. Two Sum II - Input Array is Sorted
15. 3 Sum
11. Container with most water

Sliding Window
643. Maximum Average Subarray I
3. Longest Substring without Repeating Characters
76. Minimum Window Substring

Fast and Slow Pointers
141. Linked List Cycle
202. Happy Number
287. Find the Duplicate Number

Linked List in-place reversal
206. Reverse Linked List
92. Reverse Linked List II
24. Swap Nodes in Pairs

Monotonic Stack
496. Next Greater Element I
739. Daily Temperatures
84. Largest Rectangle in Histogram

Top K. Elements OR min/max Heap
215. Kth Largest element in an array
347. Top K Frequent Elements
373. Find K Pairs with Smallest Sums

Overlapping Intervals
56. Merge Intervals
57. Insert Interval
435. Non-overlapping intervals

Modified Binary Search
33. Search in Rotated Sorted Array
153. Find Minimum in Rotated Sorted Array
240. Search a 2D Matrix II

Binary Tree Traversal
257. Binary Tree Paths
230. Kth Smallest Element in a BST
124. Binary Tree Maximum Path Sum
107. Binary Tree Level Order Traversal II

Depth First Search
133. Clone Graph
113. Path Sum II
210. Course Schedule II

Breadth First Search
102. Binary Tree Level Order Traversal
994. Rotting Oranges
127. Word Ladder

Matrix Traversal
733. Flood Fill
200. Number of Islands
130. Surrounded Regions

Backtracking
46. Permutations
78. Subsets
51. N-Queens

Dynamic Programming
70. Climbing Stairs
322. Coin Change
300. Longest Increasing Subsequence
416. Partition Equal Subset Sum
312. Burst Balloons
1143. Longest Common Subsequence
*/

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

// https://leetcode.com/problems/zigzag-conversion/description/
/*
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:
P   A   H   N
A P L S I I G
Y   I   R
*/
const convertToZigZag = (inputString, numRows) => {
  if (numRows === 1) return inputString;

  const rows = new Array(Math.min(numRows, inputString.length)).fill("");
  let direction = -1;
  let currentRow = 0;

  for (const char of inputString) {
    rows[currentRow] += char;
    currentRow += direction === -1 ? 1 : -1;

    if (currentRow === 0 || currentRow === numRows - 1) {
      direction = -direction;
    }
  }

  return rows.join("");
};

console.log("convertToZigZag:", convertToZigZag("PAYPALISHIRING", 3)); // Output: "PAHNAPLSIIGYIR"
