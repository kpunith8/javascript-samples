// Arrow funtions

const arrowFunction = (price, tax) => {
  return price * tax + price;
};

// console.log('Interest', arrowFunction(12, 10));

// Default params
// const GST = (price, tax = 0.20, term = 1) => price * tax * term;

// const calcInterest = (amount, term, interest = 0.5 * amount * term) => console.log('Total:', interest + amount);

// console.log('Tax:', GST(25, 2));

// calcInterest(2000, null);

// Rest operator - rest operators always goes to end after the params are declared

// const restParams = (name, ...params, jsjsjs) => {
//   console.log(params);
//   return name + " " + params.map(value => {
//     return value + "name"
//     //return value;
//   });
// };

// console.log(restParams('Punith', 'K', 'SSE', 30));

// function sum(...params) {
//   return params.reduce((acc, value) => acc + value);
// }

// const numbers = [1, 2, 3, 4, 5];`

// console.log('Sum:', sum(...numbers));

//Object Destructuring
const name = {
  fName: "Punith",
  lName: "P",
  age1: 30,
  education: {
    degree: "Masters",
    specification: "CSE"
  }
};

// Object destructuring can help remove the positional parameters for eg,
function fetchRepos({
  language = "all",
  minStars = 0,
  maxStarts = 100,
  createdTime = ""
}) {}

const date = {
  h: 12,
  m: 12,
  s: 44
};

// const { h: hour, m: minutes, s: seconds } = date;
// console.log(hour, minutes, seconds);

// Can be invoked as, Passing arguments in order is not required
// fetchRepos({
//   language: 'java',
//   maxStarts: 100,
//   minStars: 10,
//   createdTime: new Date('01/01/2017').getTime()
// });

// console.log(name.fName, name.lName);

// const { fName, lName, age1 } = name;
// console.log(fName, lName, age1);

// const { education: { degree, specification } } = name;

// console.log(degree, specification);

// assigning to a variable
// const { fName: firstName, lName: lastName, age1: age } = name;

// console.log('Object destructuring, named variabes:', firstName, lastName, age);

// console.log('Object destructuring: ', fName, lName, age);

// console.log('Nested object destructuring: ', degree, specification);

//Array destructuring
const numbers = [1, 2, 3, 4, 5];
//var [a, , c, , d] = numbers;

//console.log('Array destructuring:', a, c, d);

// Template Literals

// const Name = "Punith";
// const LName = "K";

// console.log(`Name is: ${Name} and ${LName}`);
// console.log("name" + " " + Name + " " + "Last Name" + " " + LName);

// Multi line without using \n
// console.log(`Hi there

// check this out
// `);

// console.log("about" + "\n" +
//   "me");

// // first and second elements are not needed
// let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// console.log(title); // Consul

// // we can use it with any iterable, not only arrays:

// let [a, b, c] = "abc"; // ["a", "b", "c"]
// let [one, two, three] = new Set([1, 2, 3]);

// console.log(one, two, three);

// let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// console.log(name1); // Julius
// console.log(name2); // Caesar

// console.log(rest[0]); // Consul
// console.log(rest[1]); // of the Roman Republic
// console.log(rest.length); // 2

// // Object destructuring
// const options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// let {ta, width, height} = options;

// //console.log(ta);  // Menu
// console.log(width);  // 100
// console.log(height); // 200
// console.log('REGULAR-EXPRESSIONS');
// regexp(/punith/g, punith);

// function f1(a) {}
// function f2(a, b) {}
// function many(a, b, ...more) {}
// console.log(f1.length); // 1
// console.log(f2.length); // 2
// console.log(many.length); // 2

console.log(
  "Sum of even numbers",
  numbers.filter(num => num % 2 === 0).reduce((acc, value) => acc + value)
);

// Generators

function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
const gen = generateNumbers();

// console.log(gen.next());
// console.log(gen.next());

for (let value of gen) {
  console.log(value);
}

// Naturally, as generators are iterable, we can call all related functionality, e.g. the spread operator ...
let sequence = [0, ...generateNumbers()];
console.log(sequence);

// The special yield* directive is responsible for the composition.
// It delegates the execution to another generator. Or, to say it simple,
// it runs generators and transparently forwards their yields outside, as if they were done by the calling generator itself.
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57);
  // or (let i = 48; i <= 57; i++) yield i; /* Or inline the generators*/

  // A..Z
  yield* generateSequence(65, 90);
  //  for (let i = 65; i <= 90; i++) yield i;

  // a..z
  yield* generateSequence(97, 122);
  // for (let i = 97; i <= 122; i++) yield i;
}

let str = "";

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(`Password codes ${str}`);

function* gen1() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2?"; // (*)

  console.log(result);
}

let generator = gen1();

let question = generator.next().value; // <-- yield returns the value

generator.next(5); // --> pass the result into the generator

let range = {
  from: 1,
  to: 5,

  // for..of calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
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
      }
    };
  }
};

for (let value of range) {
  console.log(`using Symbol.iterators: ${value}`);
}

let asyncRange = {
  from: 1,
  to: 5,

  // for await..of calls this method once in the very beginning
  [Symbol.asyncIterator]() {
    // ...it returns the iterator object:
    // onward, for await..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      async next() {
        // it should return the value as an object {done:.., value :...}
        // (automatically wrapped into a promise by async)

        // can use await inside, do async stuff:
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await (let value of asyncRange) {
    console.log(`Using Async Generators: ${value}`); 
  }
})();


