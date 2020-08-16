// Using Array
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
        keysArray.push(this.data[i][0][0]);
      }
    }

    return keysArray;
  }
}
