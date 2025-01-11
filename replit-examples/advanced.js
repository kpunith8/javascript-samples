import fetch from "node-fetch";

function* createLogger() {
  // Pauses the generator, can have many yields in a generator
  try {
    const hello = yield;
    console.log(hello);
  } catch (err) {
    console.log("ERROR", err);
  }
}

const logger = createLogger();
console.log(logger.next());
// Passing value to the generator
// console.log(logger.next('Hello'))

// use next() method on logger to get the next yield from the genrator function

// throw an error calling throw() method on a generator
logger.throw("Something went wrong");

// And can be caught using try/catch block

function* delegatedCounter() {
  yield 3;
  yield 4;
}

// Delete control to another generator using yield*
function* createCounter() {
  yield 1;
  yield 2;
  yield* delegatedCounter();
  yield 5;
  yield 6;
}

const counter = createCounter();

// use for..of loop to get all the values in a generator
for (let val of counter) {
  console.log(val);
}

// Generators to handle promise
function* createFetcher(url) {
  const response = yield fetch(url);
  const todo = yield response.json();
  return todo;
}

const todosFetcher = createFetcher(
  "https://jsonplaceholder.typicode.com/todos/1"
);
todosFetcher
  .next()
  .value.then((res) => todosFetcher.next(res).value)
  .then((res) => todosFetcher.next(res).value)
  .then((todo) => console.log({ todo }))
  .catch((err) => console.log({ err }));

// Use `co` package to reduce the boiler plate for ex
// const todosFetcher = co(createFetcher('https://jsonplaceholder.typicode.com/todos/1'))
// todosFetcher.then(todo => console.log({todo}))
