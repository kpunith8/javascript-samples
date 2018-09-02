console.log('Numbers are addeded then concatenated: ', 5 + 3 + " Some text");
console.log('Numbers are concatenated to string: ', "" + 5 + 3 + " Some text");

console.log("aaoo".search(/[aA]{2,}/));

let arr = ['cat', 'mat', 'bat'];
arr[10] = 'rat';

// Though it has empty elements from index 3 to 10 it prints as empty elements with 7 empty items
console.log('Length of array,', arr.length, ' and has,',
  arr);

// It deletes the item in the array and leave the index undefined
console.log('Remove mat from array,', delete arr[1], ', After deleting,', arr);

// use splice() to deletes the item and re-arrange the index
console.log('Remove 2 items from the array,', arr.splice(1, 2)); // starting from index 1 and removes 2 items

// unshift() adds items at the begining and shift() removes from the begining
// pop() - pops from the end of an array and push() - pushes items at the end

/**
 * This can be called in three ways
 * init_cache(); - without params, default value used
 * init_cache(15); - cache set to 15
 * init_cache(object); sets the object values
/*/
function init_cache() {
  let initData = {
    cacheSize: 10, //mb
    location: '/tmp',
    type: 'btree'
  };

  var args = arguments;

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'number') {
      initData.cacheSize = args[i];
    }
    else if (typeof args[i] === 'object') {
      initData = args[i];
    }
    // else {
    //   throw new Error('Bad params to init_cache');
    // }
  }

  console.log('init data', initData);
}

// Prototypal inheritance
function Shape() {
  this.x = 0;
  this.y = 0;

  this.move = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.moveFromOriginalPosition = function () {
    return this.x * this.x + this.y * this.y;
  }
}

function Square() {
}

Square.prototype = new Shape();
Square.prototype.__proto__ = Shape.prototype;
Square.prototype.width = 0;

Square.prototype.area = function () {
  return this.width * this.width;
}

let square = new Square();
square.move(15, 15);
square.width = 15;
console.log('Calling Shape\'s function using square', square.moveFromOriginalPosition())
console.log('ares of sqaure', square.area());

// Async programming
// setTimeout(() => {
//   console.log('Running after 2 seconds');
// }, 2000); // can be changed to any number, in milliseconds, 1000 - for 1 second

// console.log('waiting for job to complete');

// Reading file asynchronously
var fs = require('fs');
var buf = new Buffer.alloc(100000);

fs.open('test.txt', 'r', (err, handle) => {
  fs.read(handle, buf, 0, 100000, null, (err, length) => {
    console.log(buf.toString('utf-8', 0, length));
    fs.close(handle, () => { });
  });
});

// understanding this, returning call backs from a function
function FileObject() {
  this.fileName = '';

  // callback(err, boolean)
  this.fileExists = function (callback) {
    // This is to solve this reference after calling asnyc calls, also can be solved using arrow functions
    // let self = this;
    console.log('About to open:', this.fileName);

    fs.open(this.fileName, 'r', (err, handle) => { // use arrow functions, =>
      if (err) {
        console.log('Can\'t open:', this.fileName);
        callback(err);
        return;
      }

      fs.close(handle, () => { });
      callback(null, true);
    });
  }
}

let fileObject = new FileObject();
fileObject.fileName = 'test.txt';
fileObject.fileExists((err, exists) => {
  if (err) {
    console.log('Error openening file:', JSON.stringify(err));
  } else {
    console.log('File exists:', exists);
  }
});


// Samer Buna : Plural sight

/*
// Creating function to return a callback accepting a filename
const readFileAsArray = (file, cb) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      return cb(err);
    }
    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};

// Example call
readFileAsArray('./numbers', (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);

  console.log('Odd numbers count:', oddNumbers);
});
*/

// Converting the above function to return Promise, it helps avoiding the callbacks
// Keep both Promise and callbacks for the consumption, user can use either of them,
// Make sure callback provided with a default callback
// Below function can be invoked in both the ways, one specified above, callback way and another Promise way

const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return reject(err);
      }

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

const oddCountCallBacks = () => readFileAsArray('./numbers', (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);

  console.log('Odd numbers count, using callbacks:', oddNumbers.length);
});

oddCountCallBacks();

const oddCountPromise = () => readFileAsArray('./numbers').then(lines => {
  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);

  console.log('Odd numbers count, using Promise:', oddNumbers.length);
}).catch(console.error);

oddCountPromise();

// Handling it asnyc way, using async feature
async function countOddAsync() {
  try {
    const lines = await readFileAsArray('./numbers');
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);

    console.log('Odd numbers count, using async:', oddNumbers.length);
  } catch (err) {
    console.error(err);
  }
}

countOddAsync();

// Event emitters
const WithLog = require('./event-emitter.js');

const withLog = new WithLog();

withLog.emit('begin');
withLog.emit('end');