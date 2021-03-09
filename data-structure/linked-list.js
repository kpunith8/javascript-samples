// Helper class used to create Node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor(value) {
    this.head = {
      value,
      next: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = {
      value,
      next: null,
    };

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;

    return this;
  }

  prepend(value) {
    const newNode = {
      value,
      next: null,
    };

    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    return this;
  }

  print() {
    const list = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return list;
  }

  insert(index, value) {
    // index is higher than the length of the list, insert to the end of list
    if (index >= this.length) {
      return this.append(value);
    }

    if (index === 0) {
      return this.prepend(value);
    }

    const newNode = {
      value,
      next: null,
    };
    const nodeToInsert = this.traverseToIndex(index - 1);
    const nextNodeToInsert = nodeToInsert.next;

    nodeToInsert.next = newNode;
    newNode.next = nextNodeToInsert;
    this.length++;

    return this;
  }

  remove(index) {

    // Implement the edge cases, deleting the single item in the list
    // if(this.length == 1 && index > 0) {
    //   console.log(`There is only ${this.length} item in the list, not able to delete any more item`)
    //   return this;
    // }

    const nodeBeforeDeleteIndex = this.traverseToIndex(index - 1);
    const nodeToDelete = nodeBeforeDeleteIndex.next;
    nodeBeforeDeleteIndex.next = nodeToDelete.next;
    this.length--;

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

  reverse() {
    if(!this.head.next) {
      return this;
    }

    let firstNode = this.head;
    this.tail = this.head;
    let secondNode = firstNode.next;

    while(secondNode) {
      const temp = secondNode.next;
      secondNode.next = firstNode;
      firstNode = secondNode;
      secondNode = temp;
    }

    this.head.next = null;
    this.head = firstNode;

    return this;
  }
}

export class DoublyLinkedList {
  constructor(value) {
    this.head = {
      value,
      next: null,
      prev: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = {
      value,
      next: null,
      prev: null,
    };

    newNode.prev = this.tail
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;

    return this;
  }

  prepend(value) {
    const newNode = {
      value,
      next: null,
      prev: null,
    };

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;

    return this;
  }

  print() {
    const list = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return list;
  }

  insert(index, value) {
    // index is higher than the length of the list, insert to the end of list
    if (index >= this.length) {
      return this.append(value);
    }

    if (index === 0) {
      return this.prepend(value);
    }

    const newNode = {
      value,
      next: null,
      prev: null,
    };
    const nodeToInsert = this.traverseToIndex(index - 1);
    const nextNodeToInsert = nodeToInsert.next;

    nodeToInsert.next = newNode;
    newNode.prev = nodeToInsert;
    newNode.next = nextNodeToInsert;
    nextNodeToInsert.prev = newNode;
    this.length++;

    return this;
  }
  // Update this
  remove(index) {

    // Implement the edge cases, deleting the single item in the list
    // if(this.length == 1 && index > 0) {
    //   console.log(`There is only ${this.length} item in the list, not able to delete any more item`)
    //   return this;
    // }

    const nodeBeforeDeleteIndex = this.traverseToIndex(index - 1);
    const nodeToDelete = nodeBeforeDeleteIndex.next;
    nodeBeforeDeleteIndex.next = nodeToDelete.next;
    this.length--;

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
