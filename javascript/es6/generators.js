function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
const gen = generateNumbers();

// Access the value yielded by generators using next()
// console.log(gen.next());
// console.log(gen.next());

// Generatos can be accessed using for..of syntax too
for (let value of gen) {
  // console.log(value);
}

// Naturally, generators are iterable, we can call all related functionality, e.g. the spread operator ...
let sequence = [0, ...generateNumbers()];
// console.log(sequence);

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

/* ES6 - Good Parts - KYLE SIMPSON */
// Generators doesn't run when executed, it returns an iterator and runs in a paused state
function* main() {
  yield "Hey there";
  yield "Hello";
  yield "Continue after yield";

  return "Last statement";
}

// yield keyword says to pause the generator

let generatorMain = main();
// Call next() method to execute the next available value
console.log(
  "Generator function:",
  generatorMain.next(),
  generatorMain.next(),
  generatorMain.next(),
  generatorMain.next()
);

for (let v of main()) {
  // console.log(v); // it won't consider return values from generators
}

// Random value generator
function* uniqueId() {
  while (true) {
    yield Math.ceil(Math.random() * 100000);
  }
}

const uniqueIdentifier = uniqueId();
console.log(
  "Random id with generators:",
  uniqueIdentifier.next().value,
  "\nRandom id with generators:",
  uniqueIdentifier.next().value
);

// Custom iterables for an object using Symbol.iterator and generators
const objectGenerator = {
  *[Symbol.iterator]() {
    for (let index = this.start; index <= this.end; index++) {
      yield this.values[index];
    }
  },
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  start: 4,
  end: 10,
};

console.log("Custom object iterator using Symbol.iterator and generators:", [
  ...objectGenerator,
]);

const numberIteratorBySteps = {
  *[Symbol.iterator]({ start = 0, step = 1, end = 100 } = {}) {
    for (let index = start; index <= end; index = index + step) {
      yield index;
    }
  },
};

for (let v of numberIteratorBySteps) {
  // console.log(v); // Passing nothing prints 1 to 100
}

for (let v of numberIteratorBySteps[Symbol.iterator]({
  start: 40,
  step: 5,
  end: 60,
})) {
  console.log(v); // Starts from 40 with a step 5 till 100
}

// Create a custom generator that generates range of numbers on top of Number prototype
Number.prototype[Symbol.iterator] = function* numberGenerator() {
  for (let index = 0; index <= this; index++) {
    yield index;
  }
};

console.log("Number generator using Generator:", [...5]);

// Generators with return
function* generatorWithReturn() {
  yield "a";
  yield [10, 20];
  return "result";
}

// Most constructs that work with iterables ignore the value inside the done object
console.log("Using for..of loop to iterate generators");
for (const x of generatorWithReturn()) {
  console.log(x);
}

// Recursively calling generator function using yield*
function* gen11() {
  yield "2";
  yield "3";
}

function* gen2() {
  yield "1";
  yield* gen11(); // just calling gen1() returns object but doesn't yield from that.
  yield "4";
}

console.log("Yielding recursively, yield*");
for (const x of gen2()) {
  console.log(x);
}

// Synchronous generators
const iterable = ["a", "b"];
// an object returned by invoking [Symbol.iterator]() on an iterable.
// It wraps each iterated element in an object and returns it via its method next() – one at a time.
const iterator = iterable[Symbol.iterator]();
console.log("sync iterator", iterator.next());

/* ES-2018 - exploringjs.com */
async function* createAsyncIterable(syncIterable) {
  for (let element of syncIterable) {
    yield element;
  }
}

const asyncIterable = createAsyncIterable(["a", "b"]);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
asyncIterator
  .next()
  .then((iterResult1) => {
    // console.log("promise, async iterator:", iterResult1);
    return asyncIterator.next();
  })
  .then((iterResult2) => {
    // console.log("promise, iterator:", iterResult2);
    return asyncIterator.next();
  })
  .then((iterResult3) => {
    // console.log("promise, async iterator:", iterResult3);
  });

async function fnAsyncIterator() {
  const asyncIterable = createAsyncIterable(["a", "b"]);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();

  // console.log("await, async iterator:", await asyncIterator.next());
  // console.log("await, async iterator:", await asyncIterator.next());
  // console.log("await, async iterator:", await asyncIterator.next());
}

fnAsyncIterator();

/* for-await-of */
// Instead of using await on each async iterator, use for-await-of to
// loop through async iterators

(async function () {
  for await (const x of createAsyncIterable(["a", "b"])) {
    // console.log("for-await-of, async iterator:", x);
  }
})();

// Synchronous iterables return synchronous iterators,
// whose method next() returns {value, done} objects.
// for-await-of handles synchronous iterables by converting them to asynchronous iterables.
// Each iterated value is converted to a Promise (or left unchanged if it already is a Promise)
// via Promise.resolve(). That is, for-await-of works for iterables over Promises and over normal values.
(async function () {
  for await (const x of ["c", "d"]) {
    // console.log("Sync iterables, with for-await-of:", x);
  }
})();

/* yield* in async generators */

// yield* in async generators works analogously to how it works in normal generators – like a recursive invocation:

async function* gen21() {
  yield "a";
  yield "b";
  return 2;
}

async function* gen22() {
  const result = yield* gen21(); // (A)
  // console.log("Yield* in async generators:", result);
}
// In line (A), gen2() calls gen1(), which means that all elements yielded by gen1() are yielded by gen2():

(async function () {
  for await (const x of gen22()) {
    // console.log(x);
  }
})();

// The operand of yield* can be any async iterable.
// Sync iterables are automatically converted to async iterables, just like with for-await-of.

/* Errors */

// In normal generators, next() can throw exceptions.
// In async generators, next() can reject the Promise it returns

/*
async function* asyncGenerator() {
  // The following exception is converted to a rejection
  throw new Error("Throwing error in async generator!");
}

asyncGenerator()
  .next()
  .catch(err => console.log(err));
*/

// Converting exceptions to rejections is similar to how async functions work.

/* Async function vs. async generator function */

// Async function:
// 1. Returns immediately with a Promise.
// 2. Promise is fulfilled via return and rejected via throw.

/*
(async function() {
  return "Hello";
})().then(x => console.log(x));

(async function() {
  throw new Error("Problem!");
})().catch(x => console.error(x));
*/

// Async generator function:
// 1. Returns immediately with an async iterable.
// 2. Every invocation of next() returns a Promise.
//    'yield x' fulfills the “current” Promise with {value: x, done: false}.
//    throw err rejects the “current” Promise with err.

async function* gen23() {
  yield "hello";
}
const genObj = gen23();
// genObj.next().then(x => console.log(x));

/* EXAMPLE: Convert an async iterable to an array */
/**
 * @returns a Promise for an Array with the elements
 * in `asyncIterable`
 */
async function takeAsync(asyncIterable, count = Infinity) {
  const result = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (result.length < count) {
    const { value, done } = await iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

async function* gen24() {
  yield "a";
  yield "b";
  yield "c";
}

(async function () {
  console.log(
    "Convert async iterable to an array:",
    await takeAsync(gen24(), 2)
  );
})();

/* EXAMPLE: A queue as an async iterable */
const asyncQueue = new AsyncQueue();
asyncQueue.enqueue("a");
asyncQueue.enqueue("b");
asyncQueue.close();

(async function () {
  console.log("Queue as an async iterable:", await takeAsync(asyncQueue));
})();

/* EXAMPLE: Read text lines asynchronously */
/**
 * Creates an asynchronous ReadStream for the file whose name
 * is `fileName` and feeds it into an AsyncQueue that it returns.
 *
 * @returns an async iterable
 */
function readFile(fileName) {
  const queue = new AsyncQueue();
  const readStream = createReadStream(fileName, {
    encoding: "utf8",
    bufferSize: 1024,
  });

  readStream.on("data", (buffer) => {
    const str = buffer.toString("utf8");
    queue.enqueue(str);
  });

  readStream.on("end", () => {
    // Signal end of output sequence
    queue.close();
  });

  return queue;
}

/**
 * Turns a sequence of text chunks into a sequence of lines
 * (where lines are separated by newlines)
 *
 * @returns an async iterable
 */
async function* splitLines(chunksAsync) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      const line = previous.slice(0, eolIndex);
      yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

/**
 * @returns an async iterable
 */
function readLines(fileName) {
  // `queue` is an async iterable
  const queue = readFile(fileName);
  return splitLines(queue);
}

(async function () {
  for await (const line of readLines("./greeter.js")) {
    // console.log('>', line);
  }
})();
