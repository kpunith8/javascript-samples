import * as algos from "./algos.js";
import { HashTable } from "./hash-table.js";
import { LinkedList, DoublyLinkedList, StackLL, QueueLL} from "./linked-list.js";
import { BinarySearchTree, treeTraverse } from "./trees.js";
import {Graph} from "./graph.js";

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

console.log('check parantheses', algos.checkParentheses("([]{{}){}[]"));

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

const myHashTable = new HashTable(1); // try the size 2
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

const myLinkedList = new LinkedList(10);
myLinkedList.append(11)
myLinkedList.append(12)
myLinkedList.prepend(9)
myLinkedList.insert(200, 99) // index is higher than the length of the list, insert to the end of list
myLinkedList.insert(2, 33)
myLinkedList.insert(0, 34)
console.log("Linkedlist before deletion:", myLinkedList.print());

// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)

// myLinkedList.insert(3, 45)

// console.log("Linkedlist after deletion:", myLinkedList.print())
console.log('Reversed LL', JSON.stringify(myLinkedList.reverse1()));

const myDoublyLinkedList = new DoublyLinkedList(5);
myDoublyLinkedList.append(6)
myDoublyLinkedList.append(7)
myDoublyLinkedList.prepend(4)
myDoublyLinkedList.insert(200, 99) // index is higher than the length of the list, insert to the end of list
myDoublyLinkedList.insert(2, 33)
// myDoublyLinkedList.insert(0, 34)
console.log("Doubly Linkedlist:", myDoublyLinkedList.print());

const myLLStack = new StackLL()
myLLStack.push(100)
myLLStack.push(110)
myLLStack.push(115)

console.log('Stack implemented in LL:', myLLStack.pop())

const myLLQueue = new QueueLL()
myLLQueue.enqueue(1)
myLLQueue.enqueue(3)
myLLQueue.enqueue(5)

myLLQueue.dequeue()

console.log('Queue implemented in LL:', myLLQueue)

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(20)
bst.insert(9)
bst.insert(7)
bst.insert(8)
bst.insert(12)
bst.insert(23)

console.log('Binary Search Tree:', JSON.stringify(treeTraverse(bst.root)), 'lookup:', bst.lookup(20))

console.log('Binary search:', algos.binarySearch([2,3,6,8,12,33,55,77], 0, 7, 77))

const arrayToMerge = [4, 1, 8, -2, 0]

console.log('Merge sort:', algos.mergeSort(arrayToMerge, 0, arrayToMerge.length - 1))
console.log('Merge sort-1:', algos.mergeSort1(arrayToMerge))

console.log('Reverse a string recursively:', algos.recursiveReverseString("hello"))

console.log('Graphs')
const myGraph = new Graph();
myGraph.addVertex('0');
myGraph.addVertex('1');
myGraph.addVertex('2');
myGraph.addVertex('3');
myGraph.addVertex('4');
myGraph.addVertex('5');
myGraph.addVertex('6');
myGraph.addEdge('3', '1');
myGraph.addEdge('3', '4');
myGraph.addEdge('4', '2');
myGraph.addEdge('4', '5');
myGraph.addEdge('1', '2');
myGraph.addEdge('1', '0');
myGraph.addEdge('0', '2');
myGraph.addEdge('6', '5');

myGraph.showConnections();


console.log('isPalindrome:', algos.isPalindrome('madam'))

console.log('number palindrome:', algos.numberPalindrome(121))

console.log('Find all duplicates of an array', algos.findAllDuplicatesInArray([1, 2, 3, 4, 5, 3, 2, 1]))

console.log('Find all duplicates of an array-1', algos.findAllDuplicatesInArray1([6, 7, 3, 4, 5, 6, 2, 3]))

