function Queue() {
  let collection = [];

  this.print = function () {
    return collection;
  };

  // Adds element to the queue
  this.enQueue = function (element) {
    collection.push(element);
  };

  /* Code for enQueue in case of priority queue, ["data", priority]
    if (this.isEmpty()) {
      collection.push(element);
    } else {
      let added = fasle;
      for (let i = 0; i < collection.length; i++) {
        if (element[1] < collection[i][1]) {
          collection.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        collection.push(element);
      }
    }
  */

  // Removes the first element in the queue.
  this.deQueue = function () {
    return collection.shift();
  };

  // Returns the current element in the queue.
  this.front = function () {
    return collection[0];
  };

  // Returns the size of the queue.
  this.size = function () {
    return collection.length;
  };

  // Returns true if queue is empty, false otherwise.
  this.isEmpty = function () {
    return collection.length === 0;
  };
}

module.exports = Queue;