export function mySet() {
  // Holds the set
  let collection = [];

  // Checks for presence of an element and returns true or false
  this.has = function (element) {
    return (collection.indexOf(element) !== -1);
  };

  // Returns all the values in the set
  this.values = function () {
    return collection;
  };

  // Adds an element to the set, if that element doesn't exist
  this.add = function (element) {
    if (!this.has(element)) {
      collection.push(element);

      return true;
    }

    return false;
  };

  // Removes the element from the set.
  this.remove = function (element) {
    if (this.has(element)) {
      index = collection.indexOf(element);

      collection.splice(index, 1);

      return true;
    }

    return false;
  };

  // Returns the size of the set.
  this.size = function () {
    return collection.length;
  };

  // Returns the union set of the two sets.
  this.union = function (otherSet) {
    let unionSet = new Set();
    let firstSet = this.values();
    let secondSet = otherSet.values();

    firstSet.map(element => unionSet.add(element));
    secondSet.map(element => unionSet.add(element));

    return unionSet;
  };

  // Returns the intersection of the two sets.
  this.intersection = function (otherSet) {
    let intersectionSet = new mySet();
    let firstSet = this.values();

    firstSet.map(element => {
      if (otherSet.has(element)) {
        intersectionSet.add(element);
      }
    });

    return intersectionSet;
  };

  // Returns the differences of two sets.
  this.difference = function (otherset) {
    let differenceSet = new Set();
    let firstSet = this.values();

    firstSet.map(element => {
      if (!otherset.has(element)) {
        differenceSet.add(element);
      }
    });

    return differenceSet;
  };

  // Tests if the set is a subset of a different set.
  this.subSet = function (otherSet) {
    let firstSet = this.values();

    return firstSet.every(element => otherSet.has(element));
  };
}
