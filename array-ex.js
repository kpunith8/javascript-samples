let array1 = [1, 2, 3, 4, 5];
let arr1 = [[1], 2, 3, 4, 5];
let arr2 = [2, 3, 4, [4, 5, 6]];

let arr = ['cat', 'mat', 'bat'];
arr[10] = 'rat';

// Though it has empty elements from index 3 to 10 it prints as empty elements with 7 empty items
//console.log('Length of array,', arr.length, ' and has,', arr);

// It deletes the item in the array and leave the index undefined
// console.log('Remove mat from array,', delete arr[1], ', After deleting,', arr);

// use splice() to deletes the item and re-arrange the index
// console.log('Remove 2 items from the array,', arr.splice(1, 2)); // starting from index 1 and removes 2 items

// unshift() adds items at the begining and shift() removes from the begining
// pop() - pops from the end of an array and push() - pushes items at the end

// concat doesn't mutate the array
let arr3 = arr1.concat(arr2);
let arr4 = arr1.concat(4);
console.log('Concat one element:', arr4);

console.log('Concat 2 Arrays:', arr3)

// arr1 = [...arr1, arr2];

// console.log('Using spread operator:', arr1);

// place at position 0 the element between position 3 and 4
console.log('copyWithin() between:', arr1.copyWithin(0, 3, 4));

// place at position 1 the elements after position 3
console.log('copyWithin() after:', arr1.copyWithin(1, 3));

// Returns key/value pair
let iterator1 = array1.entries();

console.log('entries() iterator:', iterator1.next().value);

console.log('entries() iterator:', iterator1.next().value);

function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

// arr.every(callback(element[, index[, array]])[, thisArg])
console.log('.every():', array1.every(isBelowThreshold));

console.log('.every() on object:', [{ a: 1, b: 2, c: 3, d: 4 }, { a: 1, x: 2, y: 3, z: 4 }, { a: 1, x: 2, y: 3, z: 4 }].every(obj => obj.a === 1)); //true

// arr.fill(value[, start[, end]])

// fill with 0 from position 2 until position 4
//console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
//console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

//console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Array filters items based on search criteria (query)
 */
const filterItems = query => {
  return fruits.filter(el =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']

// The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
// find does not mutate the array on which it is called.
let found = array1.find(element => element < 10);

console.log('.find(), item:', found);

// findIndex() method, which returns the index of a found element in the array instead of its value. 0 based index

let foundIndex = array1.findIndex(element => element === 3);

console.log('findIndex(), index of the element:', foundIndex);

// Finding all the occurrences of an element
let indices = [];
let array = ['a', 'b', 'a', 'c', 'a', 'd'];
let element = 'a';
let idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}

console.log('a found in', indices);

// Finding if an element exists in the array or not and updating the array
function updateVegetablesCollection(veggies, veggie) {
  if (veggies.indexOf(veggie) === -1) {
    veggies.push(veggie);
    console.log('New veggies collection is : ' + veggies);
  } else if (veggies.indexOf(veggie) > -1) {
    console.log(veggie + ' already exists in the veggies collection.');
  }
}

let veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

updateVegetablesCollection(veggies, 'spinach');
// New veggies collection is : potato,tomato,chillies,green-pepper,spinach
updateVegetablesCollection(veggies, 'spinach');
// spinach already exists in the veggies collection.

var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 13 },
  { name: 'Zeros', value: 37 }
];

// sort by value
console.log('Sort By value\n', items.sort((a, b) => a.value - b.value));

// sort by name
console.log('Sort By name\n', items.sort((a, b) => {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}));