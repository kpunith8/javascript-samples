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
