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
