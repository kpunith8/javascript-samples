const fs = require('fs');

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

const oddCountCallBacks = () => readFileAsArray('../numbers', (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);

  console.log('Odd numbers count, using callbacks:', oddNumbers.length);
});

oddCountCallBacks();

const oddCountPromise = () => readFileAsArray('../numbers').then(lines => {
  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);

  console.log('Odd numbers count, using Promise:', oddNumbers.length);
}).catch(console.error);

oddCountPromise();

// Handling it asnyc way, using async feature
async function countOddAsync() {
  try {
    const lines = await readFileAsArray('../numbers');
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);

    console.log('Odd numbers count, using async:', oddNumbers.length);
  } catch (err) {
    console.error(err);
  }
}

countOddAsync();
