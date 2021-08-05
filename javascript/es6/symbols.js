
/* ES6 - Good Parts - KYLE SIMPSON*/
// new datatype added to JS - Globally unguessable unique value in the context
const symbol1 = Symbol("one"); // optional value, helpful for debugging, name to a symbol, doesn't signify anything
console.log(symbol1.valueOf());

const object1 = { id: 22 };
object1[symbol1] = "Secret data";

console.log("Symbol as property in an object:", object1);
console.log(
  "Symbol not listed when asked for keys:",
  Object.keys(object1),
  "own property names",
  Object.getOwnPropertyNames(object1)
);
// can be accessed using getOwnPropertySymbols method
console.log(
  "Get the symbol properties using:",
  Object.getOwnPropertySymbols(object1)
);

// well known symbols
// Symbol.iterator, Symbol.toStringTag, Symbol.toPrimitive, Symbol.isConcatSpreadable and many more.
var arr1 = [3, 4, 5];
var arrItr = arr1[Symbol.iterator]();
console.log("Using iterator on array:", arrItr.next()); // {value: 3, done: false}

// instead of using iterator manually use, for..of loop
for (let item of arr1) {
  console.log("Usage of for..of:", item);
}

// Plain objects by default are not iterables

// Custom iterables for an object using Symbol.iterator
const object2 = {
  [Symbol.iterator]() {
    let index = this.start;
    let end = this.end;

    let itr = {
      next: () => {
        if (index <= end) {
          let value = this.values[index];
          index++;

          return { value: value, done: false };
        } else {
          return { done: true };
        }
      },
    };

    return itr;
  },
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  start: 4,
  end: 13,
};

console.log("Custom object iterator using Symbol.iterator:", [...object2]);

// Custom iterator for an object
class Users {
  constructor(users) {
    this.users = users;
  }

  [Symbol.iterator]() {
    let index = 0;
    let users = this.users;

    return {
      next() {
        if (index < users.length) {
          return { value: users[index++], done: false };
        }

        return { done: true };
      },
    };
  }
}

// calling for..of loop on allUsers won't work because it is not an iterator,
// Object is not an iterator by default

/* Try this code removing [Symbol.iterator] inside Users class */
// for(let i of allUsers) {
//   console.log(i);
// }

const users = [{ name: "Punith" }, { name: "Rama" }, { name: "Krishna" }];
const allUsers = new Users(users);

// call the iterator separately
let userIterator = allUsers[Symbol.iterator]();
console.log("Custom Iterator using [Symbol.iterator]:", userIterator.next());

// or call with for..of loop or with spread operator [...allUsers]

class UsersGenerator {
  constructor(users) {
    this.users = users;
  }

  *[Symbol.iterator]() {
    for (let index in this.users) {
      // for..in loop gets the keys of an object
      // no need to return next() function from Symbol.iterator, yield returns the next()
      yield this.users[index];
    }
  }
}

const usersGen = new UsersGenerator(users);
const userSymbolGenerator = usersGen[Symbol.iterator]();

console.log(
  "User generator with [Symbol.iterator]:",
  userSymbolGenerator.next()
);
console.log("User generator with spread operator:", [...usersGen]);

// Create iterator to generate numbers from 0 to 5
let range = {
  from: 1,
  to: 5,

  // for..of calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let value of range) {
  console.log(`using Symbol.iterators: ${value}`);
}

// Async generator to generate numbers from 0 to 5
let asyncRange = {
  from: 1,
  to: 5,

  // for await..of calls this method once in the very beginning
  [Symbol.asyncIterator]() {
    // ...it returns the iterator object:
    // for await..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      async next() {
        // it should return the value as an object {done:.., value :...}
        // (automatically wrapped into a promise by async)

        // can use await inside, do async stuff:
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// (async () => {
//   for await (let value of asyncRange) {
//     console.log(`Using Async Generators: ${value}`);
//   }
// })();
