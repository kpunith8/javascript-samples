import * as algos from "./algos.js";
import { HashTable } from "./hash-table.js";

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

console.log(algos.checkParentheses("([]{}){}[]"));

console.log(
  "First recurring number in an array:",
  algos.firstRecurringNumber([2, 1, 3, 1, 2, 3, 4, 3, 2]),
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

const myHashTable = new HashTable(10); // try the size 2
myHashTable.set("grapes", 10);
myHashTable.set("apples", 20);

console.log("All items in the hash table", myHashTable.allItems());

console.log("Grapes from hash table:", myHashTable.get("grapes"));
console.log("Apples from hash table:", myHashTable.get("apples"));

console.log("Keys in the hash table:", myHashTable.keys());

// to check the address of the each hash item stored
// internally we are using array
// for(let [k, v] of myHashTable.allItems().entries()) {
//   console.log(k,v)
// }

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
  algos.hasPairWithSum([6, 4, 3, 1, 2, 7], 9)
);
