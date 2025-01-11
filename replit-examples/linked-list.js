class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;

const printLinkedList = (head) => {
  let currentNode = head;
  while (currentNode !== null) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
};

console.log(node1);
printLinkedList(node1);

// Linked list with a head, a tail, and length property
class LinkedList {
  constructor(value) {
    this.head = { value, next: null };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = { value, next: null };

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;

    return this;
  }

  printList() {
    const list = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return list;
  }
}

// Node with data and next pointer, it can be a class too
function Node1(data, next) {
  this.data = data;
  this.next = next;
}

class LinkedList1 {
  constructor(data) {
    this.head = new Node1(data, null);
    this.length = 1;
  }

  append(data) {
    const newNode = new Node1(data, null);
    this.head.next = newNode;
    newNode.next = null;
    this.length++;
    return this;
  }

  prepend(data) {
    const newNode = new Node1(data, null);

    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    return this;
  }

  printList() {
    const list = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      list.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return list;
  }

  insert(index, data) {
    if (index >= this.length) {
      return this.append(data);
    }

    if (index === 0) {
      return this.prepend(data);
    }

    const newNode = new Node1(data, null);
    const nodeToInsert = this.traverseToIndex(index - 1);
    const nextNodeToInsert = nodeToInsert.next;

    nodeToInsert.next = newNode;
    newNode.next = nextNodeToInsert;
    this.length++;

    return this;
  }

  traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head;

    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }

    return currentNode;
  }
}

// Creating a list with a value having head and tail
const List1 = new LinkedList(1);
List1.append(2);
List1.append(3);
console.log(
  "List with value having a head and a tail:",
  List1.printList(),
  List1
);

// Creating a list with a value
const list1a = new LinkedList1(5);
list1a.append(6);
list1a.prepend(4);
list1a.insert(2, 88);

console.log("List with value having a head only:", list1a.printList(), list1a);

// Merge sorted linked list
function mergeSortedList(L1, L2) {
  // create new linked list pointer
  let L3 = new Node1(null, null);
  let prev = L3;

  // while both linked lists are not empty
  while (L1 !== null && L2 !== null) {
    if (L1.data <= L2.data) {
      prev.next = L1;
      L1 = L1.next;
    } else {
      prev.next = L2;
      L2 = L2.next;
    }
    prev = prev.next;
  }

  // once we reach end of a linked list, append the other
  // list because we know it is already sorted
  if (L1 === null) {
    prev.next = L2;
  }
  if (L2 === null) {
    prev.next = L1;
  }

  // return the sorted linked list
  return L3.next;
}

// The helper method to print the merged list
function printList1(list) {
  let currentNode = list;
  const newList = [];
  while (currentNode !== null) {
    newList.push(currentNode.data);
    currentNode = currentNode.next;
  }

  return newList;
}

// List with connecting the nodes explicitly
// create first linked list: 1 -> 3 -> 10
const n3 = new Node1(10, null);
const n2 = new Node1(3, n3);
// n1 is the head node
const n1 = new Node1(1, n2);

// create second linked list: 5 -> 6 -> 9
const n6 = new Node1(9, null);
const n5 = new Node1(6, n6);
// n4 is the head node
const n4 = new Node1(5, n5);

const mergedList = mergeSortedList(n1, n4);
console.log("Merged List:", printList1(mergedList));
