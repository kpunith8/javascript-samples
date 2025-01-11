// Left: 2 * n
// Right: 2 * n + 1
// Parent: floor(n / 2)

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
}

const minHeap = new MinHeap([4, 5, 8, 2]);
console.log(minHeap.insert(3));
// minHeap.insert(5)
// minHeap.insert(10)
// minHeap.insert(9)
// minHeap.insert(4)

// console.log('remove', minHeap.remove())

console.log("minHeap", minHeap.display());
