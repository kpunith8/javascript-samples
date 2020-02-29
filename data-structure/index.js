import {
  mergeSortedArrays,
  reverseStringArr,
  reverseStringLib
} from "./algo-sample.js";

console.log("Reverse a string with array:", reverseStringArr("Hello Punith"));

console.log(
  "Reverse a string with lib functions:",
  reverseStringLib("Hello World")
);

console.log(
  "Merged sorted arrays:",
  mergeSortedArrays([1, 3, 4, 55], [4, 11, 44])
);
