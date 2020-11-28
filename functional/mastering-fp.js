// Mastering JS Functional Programming - Kereki Fedrico
const { performance } = require('perf_hooks');

// Classes as first class objects
const makeHelloClass = (greeting) =>
  class {
    constructor(name) {
      this.name = name;
    }

    sayHelloTo(person) {
      console.log(`${this.name} says ${greeting} to ${person}`);
    }
  };

const Spanish = makeHelloClass('Hola');
new Spanish('Roy').sayHelloTo('Mang');

new (makeHelloClass('Hello'))('Roy').sayHelloTo('Mand');

const fullHello = (c, x, y) => new c(x).sayHelloTo(y);
const French = makeHelloClass('BON JOUR');
fullHello(French, 'EPSILON', 'ZETA');

// Higher order function to run the code only once
const once = (fn) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      fn(...args);
    }
  };
};

const showMessage = (msg) => console.log(`Hello ${msg}`);
const greet = (msg) => console.log(`Greet ${msg}`);

const showOnce = once(showMessage);
showOnce('World once');
// These calls won't execute
showOnce('How');
showOnce('is');

// Executes the first fn once and second fn on subsequent calls
const onceAndAfter = (f, g) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      f(...args);
    } else {
      g(...args);
    }
  };
};

// Executes the functions alternatively
const alternator = (f, g) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      f(...args);
    } else {
      done = false;
      g(...args);
    }
  };
};

const showMessage1 = () => console.log(`1`);
const greet1 = () => console.log(`2`);
const alternativeFn = alternator(showMessage1, greet1);
alternativeFn();
alternativeFn();
alternativeFn();
alternativeFn();

// memoization with fibonacci series
let cache = [];
const fib = (n) => {
  console.time(`fib(${n})`);
  if (cache[n] == undefined) {
    if (n == 0) {
      cache[0] = 0;
    } else if (n == 1) {
      cache[1] = 1;
    } else {
      cache[n] = fib(n - 2) + fib(n - 1);
    }
  }
  console.timeEnd(`fib(${n})`);

  return cache[n];
};

// This function doesn't do any unnecessary or repeated computations.
const fibNormal = (n, a = 0, b = 1) =>
  n === 0 ? a : fibNormal(n - 1, b, a + b);

console.log('fibNormal', fibNormal(11));

console.log(fib(4));
console.log(fib(6));
console.log(fib(5));

const shuffle = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let r = Math.floor(Math.random() * (len - i));
    [arr[i], arr[i + r]] = [arr[i + r], arr[i]];
  }
  return arr;
};

var arr1 = [11, 22, 33, 44, 55, 66, 77, 88, 99];
console.log('Shuffled array', shuffle(arr1));

// Higher Order Functions
// Passing console.log as logger to the withLog to make it
// side effects free
const withLog = (fn, logger = console.log) => (...args) => {
  try {
    logger(`Entering ${fn.name}: ${args}`);
    return fn(...args);
  } catch (error) {
    logger(`Exiting ${fn.name}: threw ${error}`);
    throw error;
  }
};

function subtract(a, b) {
  b = changeSign(b);
  return a + b;
}

function changeSign(a) {
  return -a;
}

const subtractWithLog = withLog(subtract);
changeSign = withLog(changeSign);
subtractWithLog(7, 5);

const getPerf = () => performance.now();
const timeLogger = (msg, fnName, start, end) =>
  console.log(`${fnName} - ${msg} took ${end - start} ms`);

const withTiming = (fn, getTime = getPerf, logger = timeLogger) => (
  ...args
) => {
  const start = getTime();

  try {
    logger('Normal exit', fn.name, start, getTime());
    return fn(...args);
  } catch (error) {
    logger('Exception thrown', fn.name, start, getTime());
    throw error;
  }
};

const withTimeSubtract = withTiming(subtract);

withTimeSubtract(10, 20);

function fib2(n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib2(n - 2) + fib2(n - 1);
  }
}

// memoization
const memoize = (fn) => {
  let cache = {};
  return (x) => (x in cache ? cache[x] : (cache[x] = fn(x)));
};

fib2 = memoize(fib2)
const testFib = (n) => fib2(n);
withTiming(testFib)(40);
withTiming(testFib)(30);
withTiming(testFib)(40);

const testMemoFib = memoize(testFib);
withTiming(testMemoFib)(40);
withTiming(testMemoFib)(20);
withTiming(testMemoFib)(40);
withTiming(testMemoFib)(20);

module.exports = { once, onceAndAfter };
