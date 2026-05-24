/*
❓ ❓Why not singly linked list?

✔ Removing a node requires previous pointer → O(n)

❓Why delete node before adding to head?

✔ Prevents duplicates
✔ Ensures correct order

❓ Why dummy head & tail?

✔ Avoid null checks
✔ Cleaner logic
✔ Industry standard
*/
class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();

    this.head = new DoublyLinkedListNode(null, null);
    this.tail = new DoublyLinkedListNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const node = this.cache.get(key);
    this.moveToFront(node);

    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToFront(node);
      return;
    }

    if (this.cache.size >= this.capacity) {
      this.evictLRUItem();
    }

    const newNode = new DoublyLinkedListNode(key, value);
    this.cache.set(key, newNode);
    this.addAfterHead(newNode);
  }

  moveToFront(node) {
    this.removeNode(node);
    this.addAfterHead(node);
  }

  addAfterHead(node) {
    // (head) prev - node - next (head.next)
    node.prev = this.head;
    node.next = this.head.next;

    // Adjust the existing first node's prev to point to the new node
    this.head.next.prev = node;
    // Adjust head's next to point to the new node
    this.head.next = node;
  }

  removeNode(node) {
    // Previous node's next points to current node's next node
    node.prev.next = node.next;
    // Next node's prev points to current node's previous node
    node.next.prev = node.prev;
  }

  evictLRUItem() {
    const lruNode = this.tail.prev;
    this.removeNode(lruNode);
    this.cache.delete(lruNode.key);
  }
}

const lruCache = new LRUCache(2);
lruCache.put(1, 1); // cache is {1=1}
lruCache.put(2, 2); // cache is {1=1, 2=2}
console.log(lruCache.get(1)); // return 1
lruCache.put(3, 3); // evicts key 2, cache is {1=1, 3=3}
console.log(lruCache.get(2)); // returns -1 (not found)
lruCache.put(4, 4); // evicts key 1, cache is {4=4, 3=3}
console.log(lruCache.get(1)); // return -1 (not found)
console.log(lruCache.get(3)); // return 3
console.log(lruCache.get(4)); // return 4
