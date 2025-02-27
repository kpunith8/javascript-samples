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

// Example usage:
const heap1 = new MinHeap1();
heap1.insert(4);
heap1.insert(5);
heap1.insert(8);
heap1.insert(2);
heap1.insert(3);

console.log("minHeap1:", heap1.display());
console.log('Min item:', heap1.peek())
console.log('Extract min:', heap1.extractMin())
console.log("After the extraction:", heap1.display());

