// Using Array as data structure, if there is a key collision in the
// keys it will push the item to the same array
// It may have the time complexity of O(n) when reading the keys
// Hash table should have the time complexity of O(1) for reading, deleting and
// adding key value pairs

// This was to demonstrate user defined hash table for learning purpose
export class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    // it could be more complex
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }

    return hash;
  }

  allItems() {
    return this.data;
  }

  set(key, value) {
    const hashKey = this._hash(key);
    if (!this.data[hashKey]) {
      this.data[hashKey] = [];
    }

    this.data[hashKey].push([key, value]);

    return this.data;
  }

  get(key) {
    const hashKey = this._hash(key);
    const currentBucket = this.data[hashKey];

    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          // check the first item in the array for the key
          return currentBucket[i][1];
        }
      }
    }
  }

  // fix when an item has the same hash key
  keys() {
    let keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        if (this.data[i].length > 1) {
          this.data[i].map((item) => {
            keysArray.push(item[0]);
          });
        } else {
          keysArray.push(this.data[i][0][0]);
        }
      }
    }

    return keysArray;
  }
}
