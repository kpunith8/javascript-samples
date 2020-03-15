class ArrayQueue extends Array {
  enqueue(value) {
    // Add at the end
    return this.push(value);
  }

  dequeue() {
    // Remove first element
    return this.shift();
  }
}

export default ArrayQueue;
