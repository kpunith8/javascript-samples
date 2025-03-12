import { HashTable } from "./hash-table.js";
import {
  LinkedList,
  DoublyLinkedList,
  StackLL,
  QueueLL,
} from "./linked-list.js";
import { BinarySearchTree, treeTraverse } from "./trees.js";
import { Graph } from "./graph.js";
import {
  depthFirstSearchPrint,
  Node,
  depthFirstRecursive,
} from "./dfs-tree.js";

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
myLinkedList.append(11);
myLinkedList.append(12);
myLinkedList.prepend(9);
myLinkedList.insert(200, 99); // index is higher than the length of the list, insert to the end of list
myLinkedList.insert(2, 33);
myLinkedList.insert(0, 34);
console.log("Linkedlist before deletion:", myLinkedList.print());

// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)
// myLinkedList.remove(1)

// myLinkedList.insert(3, 45)

// console.log("Linkedlist after deletion:", myLinkedList.print())
console.log("Reversed LL(reverse1)", JSON.stringify(myLinkedList.reverse1()));

const myDoublyLinkedList = new DoublyLinkedList(5);
myDoublyLinkedList.append(6);
myDoublyLinkedList.append(7);
myDoublyLinkedList.prepend(4);
myDoublyLinkedList.insert(200, 99); // index is higher than the length of the list, insert to the end of list
myDoublyLinkedList.insert(2, 33);
// myDoublyLinkedList.insert(0, 34)
console.log("Doubly Linkedlist:", myDoublyLinkedList.print());

const myLLStack = new StackLL();
myLLStack.push(100);
myLLStack.push(110);
myLLStack.push(115);

console.log("Stack implemented in LL:", myLLStack.pop());

const myLLQueue = new QueueLL();
myLLQueue.enqueue(1);
myLLQueue.enqueue(3);
myLLQueue.enqueue(5);

myLLQueue.dequeue();

console.log("Queue implemented in LL:", myLLQueue);

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(20);
bst.insert(9);
bst.insert(7);
bst.insert(8);
bst.insert(12);
bst.insert(23);

console.log(
  "Binary Search Tree:",
  JSON.stringify(treeTraverse(bst.root)),
  "lookup:",
  bst.lookup(20)
);

console.log("Graphs");
const myGraph = new Graph();
myGraph.addVertex("0");
myGraph.addVertex("1");
myGraph.addVertex("2");
myGraph.addVertex("3");
myGraph.addVertex("4");
myGraph.addVertex("5");
myGraph.addVertex("6");
myGraph.addEdge("3", "1");
myGraph.addEdge("3", "4");
myGraph.addEdge("4", "2");
myGraph.addEdge("4", "5");
myGraph.addEdge("1", "2");
myGraph.addEdge("1", "0");
myGraph.addEdge("0", "2");
myGraph.addEdge("6", "5");

myGraph.showConnections();

// DFS - iterative aproach
const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//    a
//   /  \
//   b   c
// /  \   \
// d   e   f

console.log("BFS iterative");
// abdecf (pre-order) Self - Left - Right
depthFirstSearchPrint(a);

console.log("BFS recursive");
depthFirstRecursive(a);
