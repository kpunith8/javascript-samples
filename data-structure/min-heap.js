// Left: 2 * n
// Right: 2 * n + 1
// Parent: floor(n / 2)

// Priority Queue or Heap are the same thing
class MinHeap {
  constructor(items) {
    // Initialize the first element to null, adding elements from index 1
    // makes it easier to calculate left and right child index positions
    this.heap = [null];
    items.forEach((item) => this.insert(item));
  }

  // Access the min element at the index 1
  getMin() {
    return this.heap[1];
  }

  insert(node) {
    // Insert a new node to the end of the heap
    this.heap.push(node);

    if (this.heap.length > 1) {
      let current = this.heap.length - 1;
      // Traverse up the parent node until the current node is greater than the parent
      while (
        current > 1 &&
        this.heap[Math.floor(current / 2)] > this.heap[current]
      ) {
        // Swap the current node with its parent
        this.swap(Math.floor(current / 2), current);
        current = Math.floor(current / 2);
      }
    }

    return this.heap[1];
  }

  remove() {
    let smallest = this.getMin();

    if (this.heap.length > 2) {
      // First element in the heap is the min element, so replace it with the last element
      this.heap[1] = this.heap[this.heap.length - 1];
      // Remove the last element from the heap
      this.heap.splice(this.heap.length - 1);

      if (this.heap.length === 3) {
        if (this.heap[1] > this.heap[2]) {
          this.swap(1, 2);
        }
        return smallest;
      }

      let current = 1;
      let leftChildIndex = current * 2;
      let rightChildIndex = current * 2 + 1;

      while (
        this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.heap[current] > this.heap[leftChildIndex] ||
          this.heap[current] > this.heap[rightChildIndex])
      ) {
        if (this.heap[leftChildIndex] < this.heap[rightChildIndex]) {
          this.swap(current, leftChildIndex);
          current = leftChildIndex;
        } else {
          this.swap(current, rightChildIndex);
          current = rightChildIndex;
        }
        leftChildIndex = current * 2;
        rightChildIndex = current * 2 + 1;
      }
    } else if (this.heap.length === 2) {
      this.heap.splice(1, 1);
    } else {
      return null;
    }

    return smallest;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  display() {
    return this.heap;
  }

  // Heap Sort Takes O(n log n) time complexity
  sort() {
    const result = [];
    while (this.heap.length > 1) {
      result.push(this.remove());
    }
    return result;
  }
}

const minHeap = new MinHeap([4, 5, 8, 2]);
console.log(minHeap.insert(3));
// minHeap.insert(5)
// minHeap.insert(10)
// minHeap.insert(9)
// minHeap.insert(4)

// console.log('remove', minHeap.remove())

console.log("minHeap:", minHeap.display());
console.log("heap sort:", minHeap.sort());

// Considers the first element (0th index) as the min element
// Parent: floor((index - 1) / 2)
// Left Child: 2 * index + 1
// Right Child: 2 * index + 2
class MinHeap1 {
  constructor() {
    this.heap = [];
  }

  // Helper method to get parent index
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Helper method to get left child index
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // Helper method to get right child index
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // Insert a new key into the heap
  insert(key) {
    this.heap.push(key);
    this.heapifyUp(this.heap.length - 1);
  }

  // Move an element up to maintain heap property after insertion
  heapifyUp(index) {
    let currentIndex = index;
    while (
      currentIndex > 0 &&
      this.heap[currentIndex] < this.heap[this.getParentIndex(currentIndex)]
    ) {
      [this.heap[currentIndex], this.heap[this.getParentIndex(currentIndex)]] =
        [this.heap[this.getParentIndex(currentIndex)], this.heap[currentIndex]];
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  // Get the minimum element (root) of the heap
  peek() {
    return this.heap[0];
  }

  // Remove and return the minimum element
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  // Move an element down to maintain heap property after removal
  heapifyDown(index) {
    let smallest = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.heapifyDown(smallest);
    }
  }

  display() {
    return this.heap;
  }
}

const heap1 = new MinHeap1();
heap1.insert(4);
heap1.insert(5);
heap1.insert(8);
heap1.insert(2);
heap1.insert(3);

console.log("minHeap1:", heap1.display());
console.log("Min item:", heap1.peek());
console.log("Extract min:", heap1.extractMin());
console.log("After the extraction:", heap1.display());

class MinHeapGrok3 {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown();
    return min;
  }

  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let smallest = index;
      if (leftChild < length && this.heap[leftChild] < this.heap[smallest])
        smallest = leftChild;
      if (rightChild < length && this.heap[rightChild] < this.heap[smallest])
        smallest = rightChild;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0] || null;
  }

  display() {
    return this.heap;
  }
}

const heap2 = new MinHeapGrok3();
heap2.insert(4);
heap2.insert(5);
heap2.insert(8);
heap2.insert(2);
heap2.insert(3);

console.log("Min item, MinHeapGrok3:", heap2.peek());
console.log("After the extraction, MinHeapGrok3:", heap2.display());


// MinHeap class for efficient node comparison
class LinkedListMinHeap {
  constructor() {
    this.heap = []; // Array to store heap elements
  }

  // Insert a node into the heap
  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  // Extract the minimum node from the heap
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop(); // JS built-in pop

    const min = this.heap[0];
    this.heap[0] = this.heap.pop(); // Replace root with last element
    this.sinkDown();
    return min;
  }

  // Bubble up the last inserted element to maintain heap property
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2); // JS built-in Math.floor
      if (this.heap[parentIndex].val <= this.heap[index].val) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  // Sink down the root to maintain heap property
  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < length &&
        this.heap[leftChild].val < this.heap[smallest].val
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < length &&
        this.heap[rightChild].val < this.heap[smallest].val
      ) {
        smallest = rightChild;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  // Check if heap is empty
  size() {
    return this.heap.length;
  }
}

/*
Kth Largest Element in an Array
Time Complexity: O(n log k)
Maintain a min heap of size k. If it exceeds k, remove the smallest. The top element is the kth largest. O(n log k) time, O(k) space.
*/
function findKthLargest(nums, k) {
  const minHeap = new MinHeapGrok3();

  for (let num of nums) {
    minHeap.insert(num); // Add each number to heap
    if (minHeap.size() > k) {
      minHeap.extractMin(); // Keep only k largest by removing smallest
    }
  }
  return minHeap.peek(); // Top of heap is kth largest
}

console.log("findKthLargest:", findKthLargest([3, 2, 1, 5, 6, 4], 2)); // Output: 5

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/*
Merge K Sorted Lists: Use a min heap to store nodes by value.
Extract the smallest, add its next node, and build the merged list.
Time Complexity: O(n log k) (n = total nodes, k = number of lists)
*/
function mergeKLists(lists) {
  const minHeap = new MinHeapGrok3();

  // Add first node of each list to heap
  for (let list of lists) {
    if (list) minHeap.insert({ val: list.val, node: list });
  }

  const dummy = new ListNode(0);
  let current = dummy;

  while (minHeap.size() > 0) {
    const { val, node } = minHeap.extractMin(); // Get smallest node
    current.next = new ListNode(val); // Add to result
    current = current.next;
    if (node.next) minHeap.insert({ val: node.next.val, node: node.next }); // Add next node
  }

  return dummy.next; // Dummy node has 0 as its value as the first element
}

const l1 = new ListNode(1, new ListNode(4, new ListNode(8)));
const l2 = new ListNode(2, new ListNode(6));

// Works for 2 lists
console.log("Merge K Sorted Lists:", JSON.stringify(mergeKLists([l1, l2]))); // Output: 1 -> 2 -> 4 -> 6 -> 8

// K Closest Points to Origin
// Time Complexity: O(n log k)
function kClosest(points, k) {
  const minHeap = new MinHeapGrok3();

  for (let [x, y] of points) {
    const dist = x * x + y * y; // Distance squared (no need for sqrt)
    minHeap.insert([dist, x, y]); // Store [distance, x, y]
    console.log("minHeap:", minHeap.display());
    if (minHeap.size() > k) minHeap.extractMin(); // Keep k closest
  }

  const result = [];
  while (minHeap.size() > 0) {
    const [, x, y] = minHeap.extractMin();
    result.push([x, y]); // Extract coordinates
  }
  return result;
}

console.log(
  "kClosest:",
  kClosest(
    [
      [1, 3],
      [-2, 2],
    ],
    1
  )
); // Output: [[-2, 2]]

/*
Top K Frequent Elements
Time Complexity: O(n log k)
*/
function topKFrequent(nums, k) {
  const freqMap = new Map();
  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1); // Build frequency map
  }

  const minHeap = new MinHeapGrok3();
  for (let [num, freq] of freqMap) {
    minHeap.insert([freq, num]); // Store [frequency, number]
    if (minHeap.size() > k) minHeap.extractMin(); // Keep k most frequent
  }

  const result = [];
  while (minHeap.size() > 0) {
    result.push(minHeap.extractMin()[1]); // Extract numbers
  }
  return result;
}

console.log("topKFrequent:", topKFrequent([1, 1, 1, 2, 2, 3], 2)); // Output: [1, 2]

/*
Sort an Almost Sorted Array (K-Sorted Array)
Time Complexity: O(n log k), O(k) space
*/
function sortKSortedArray(arr, k) {
  const minHeap = new MinHeapGrok3();
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    minHeap.insert(arr[i]); // Add elements to heap
    if (minHeap.size() > k + 1) {
      result.push(minHeap.extractMin()); // Extract when window exceeds k
    }
  }
  while (minHeap.size() > 0) {
    result.push(minHeap.extractMin()); // Empty remaining heap
  }
  return result;
}

console.log("sortKSortedArray:", sortKSortedArray([6, 5, 3, 2, 8, 10, 9], 3)); // Output: [2, 3, 5, 6, 8, 9, 10]

/*
Minimum Cost to Connect Sticks
Time Complexity: O(n log n), O(n) space
*/
function connectSticks(sticks) {
  if (sticks.length <= 1) return 0;
  const minHeap = new MinHeapGrok3();

  for (let stick of sticks) {
    minHeap.insert(stick); // Add all sticks to heap
  }

  let cost = 0;
  while (minHeap.size() > 1) {
    const stick1 = minHeap.extractMin();
    const stick2 = minHeap.extractMin();
    const combined = stick1 + stick2;
    cost += combined;
    minHeap.insert(combined); // Add combined stick back
  }
  return cost;
}

console.log("connectSticks:", connectSticks([2, 4, 3])); // Output: 14

// Function to merge K sorted linked lists
function mergeKLinkedLists(lists) {
  // Filter out null or empty lists and ensure K > 2
  lists = lists.filter((list) => list !== null);
  if (lists.length <= 2) {
    throw new Error("Number of lists must be greater than 2");
  }

  const minHeap = new LinkedListMinHeap();

  // Initialize heap with the head of each list
  for (let list of lists) {
    if (list) minHeap.insert(list); // Add head node of each list
  }

  // Dummy node to simplify merging
  const dummy = new ListNode(0);
  let current = dummy;

  // Merge lists using the heap
  while (minHeap.size() > 0) {
    const minNode = minHeap.extractMin(); // Get smallest node
    current.next = minNode; // Append to result
    current = current.next;

    if (minNode.next) {
      minHeap.insert(minNode.next); // Add next node from the same list
    }
  }

  return dummy.next; // Return merged list
}

// Helper function to create a linked list from an array
function createList(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to print the linked list
function printList(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  console.log(result.join(" -> "));
}

// Example usage with K > 2 lists
const list1 = createList([1, 4, 5]);
const list2 = createList([2, 6]);
const list3 = createList([3, 7, 8]);
const list4 = createList([0, 9]);

const lists = [list1, list2, list3, list4];
const mergedList = mergeKLinkedLists(lists);
printList(mergedList); // Output: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
