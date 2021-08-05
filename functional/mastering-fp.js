// Mastering JS Functional Programming - Kereki Fedrico
import { performance } from "perf_hooks";

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

const Spanish = makeHelloClass("Hola");
new Spanish("Roy").sayHelloTo("Mang");

new (makeHelloClass("Hello"))("Roy").sayHelloTo("Mand");

const fullHello = (c, x, y) => new c(x).sayHelloTo(y);
const French = makeHelloClass("BON JOUR");
fullHello(French, "EPSILON", "ZETA");

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
showOnce("World once");
// These calls won't execute
showOnce("How");
showOnce("is");

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

// above can be re-written using funtion as first order objects
const onceAndAfter1 = (f, g) => {
  let nextFunc = f;
  return (...args) => {
    const res = nextFunc(...args);
    nextFunc = g;
    return res;
  };
};

const testOnceAndAfter = onceAndAfter1(showMessage, greet);
testOnceAndAfter("World once again");
testOnceAndAfter("Hi");
testOnceAndAfter("Hello");

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
console.log("Executing alternative functions on each call:");
alternativeFn();
alternativeFn();
alternativeFn();
alternativeFn();

// user defined reducer
const add = (accumulator, currentValue) => accumulator + currentValue;

const reduce = (arr, reducer, initialValue) => {
  let accumulator = !initialValue ? arr.shift() : initialValue;
  arr.forEach((el) => (accumulator = reducer(accumulator, el)));

  return accumulator;
};

const arr3 = [2, 4, 6, 8, 10];

console.log("User defined reduce:", reduce(arr3, add, 10));

const intersection = (accumulator, currentArray) =>
  currentArray.filter((el) => accumulator.includes(el));

const intersectionReducer = (...arrs) => reduce(arrs, intersection);

console.log(
  "Intersection of arrays with reducer:",
  intersectionReducer([1, 12, 3], [4, 5, 2, 53], [3])
);

const join = (accumalator, currentArray) =>
  accumalator.concat(
    currentArray.filter((item) => !accumalator.includes(item))
  );

const joinReducer = (...arrays) => reduce(arrays, join);

console.log(
  "Join arrays with reducer:",
  joinReducer([1, 21, 3], [4, 5, 2, 53], [3])
);

//decorator function to validate the number of params required by a function
const isAllArgsValid = function (fn) {
  return function (...args) {
    if (args.length != fn.length) {
      throw new Error("Only submit required number of params");
    }
    const validArgs = args.filter((arg) => Number.isInteger(arg));
    if (validArgs.length < fn.length) {
      throw new TypeError("Argument cannot be a non-integer");
    }
    return fn(...args);
  };
};

const mul = (a, b) => a * b;
const mulValidArgs = isAllArgsValid(mul);
// Passing 3 arguments or non-integer will throw an error
mulValidArgs(10, 3);

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

// console.log("fibNormal", fibNormal(11));

// console.log(fib(4));
// console.log(fib(6));
// console.log(fib(5));

const shuffle = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let r = Math.floor(Math.random() * (len - i));
    [arr[i], arr[i + r]] = [arr[i + r], arr[i]];
  }
  return arr;
};

var arr1 = [11, 22, 33, 44, 55, 66, 77, 88, 99];
console.log("Shuffled array", shuffle(arr1));

// Higher Order Functions
// Passing console.log as logger to the withLog to make it
// side effects free
const withLog =
  (fn, logger = console.log) =>
  (...args) => {
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

// const subtractWithLog = withLog(subtract);
// changeSign = withLog(changeSign);
// subtractWithLog(7, 5);

const getPerf = () => performance.now();
const timeLogger = (msg, fnName, start, end) =>
  console.log(`${fnName} ${msg} took ${end * 1000 - start * 1000} s`);

const withTiming =
  (fn, getTime = getPerf, logger = timeLogger) =>
  (...args) => {
    const start = getTime();

    try {
      logger("Normal exit", fn.name, start, getTime());
      return fn(...args);
    } catch (error) {
      logger("Exception thrown", fn.name, start, getTime());
      throw error;
    }
  };

// const withTimeSubtract = withTiming(subtract);

// withTimeSubtract(10, 20);

function fib2(n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib2(n - 2) + fib2(n - 1);
  }
}

// memoization with primitives as a key
const memoize = (fn) => {
  let cache = {};
  return (x) => (x in cache ? cache[x] : (cache[x] = fn(x)));
};

fib2 = memoize(fib2);
const testFib = (n) => fib2(n);
// withTiming(testFib)(40);
// withTiming(testFib)(30);
// withTiming(testFib)(40);

// console.log("fib(40)", withTiming(testFib)(40));
// console.log("fib(30)", withTiming(testFib)(30));
// console.log("fib(38)", withTiming(testFib)(38));
// console.log("fib(25)", withTiming(testFib)(25));

// Keys can be objects or arrays
const memoize1 = (fn) => {
  const cache = {};
  const PRIMITIVES = ["number", "string", "boolean"];
  return (...args) => {
    const strX =
      args.length === 1 && PRIMITIVES.includes(typeof args[0])
        ? args[0]
        : JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

// Will have low performance and is concise to read
const memoize2 = (fn) => {
  const cache = {};
  return (...args) => {
    const strX = JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

// Negate the filter using higher order functions
const arr2 = [10, 2, 4, 6, -2, 12, -11, -20];

const isNegative = (v) => v < 0;

const not =
  (fn) =>
  (...args) =>
    !fn(...args);

const filterNot = (arr) => (fn) => arr.filter(not(fn));

const testFilterNot = filterNot(arr2);
console.log("filter negative numbers HOF:", testFilterNot(isNegative));

console.log(
  "filter negative numbers without HOF:",
  arr2.filter(not(isNegative))
);

const invert =
  (fn) =>
  (...args) =>
    -fn(...args);
const spanishComparison = (a, b) => a.localeCompare(b, "es");

var palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];

console.log("Sort in Ascending order", palabras.sort(spanishComparison));
console.log(
  "Sort in Descending order",
  palabras.sort(invert(spanishComparison))
);

// Currying and Partial applications
// Function that takes one parameter at a time

const addVatCurried = (rate) => (amount) => amount * (1 + rate * 0.01);

const nationalVat = addVatCurried(6);
const goodsVat = addVatCurried(12);

console.log("National VAT for 5000:", nationalVat(5000));
console.log("Goods VAT for 5000:", goodsVat(5000));

// Create a curry function usign bind
const curryByBind = (fn) =>
  fn.length === 0 ? fn() : (p) => curryByBind(fn.bind(null, p));

const add3 = (a, b, c) => a + b + c;

const add3Curried = curryByBind(add3);
console.log("Convert function to a curried function:", add3Curried(10)(12)(14));

// given a function, to fix its first few arguments, and produce a new function that will receive the rest of them
// fn(2, 3)(4)
const partialCurryByBind = (fn) =>
  fn.length === 0 ? fn() : (...p) => partialCurryByBind(fn.bind(null, ...p));

const add3PartiallyCurried = partialCurryByBind(add3)(5, 4);

console.log("Partial currying:", add3PartiallyCurried(6));

const sum2 = (...args) => args.reduce((x, y) => x + y, 0);

// Pass variable length params to partial curry
const partialCurryingByBind2 = (fn, len = fn.length) =>
  len === 0
    ? fn()
    : (...p) => partialCurryingByBind2(fn.bind(null, ...p), len - p.length);

// Takes maximum of 5 params to curry
const pcSum5 = partialCurryingByBind2(sum2, 5); // curriedSum5 will expect 5 parameters
console.log(
  "partial curry with variable number of params:",
  pcSum5(1, 5)(3)(7, 4)
);

// Pipeline - Functions are applied from left to right, composition - functions are appplied from right to left
const samplePipe =
  (f, g) =>
  (...args) =>
    g(f(...args));

// imperative pipeline
const pipeline1 =
  (...fns) =>
  (...args) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = fns[i](result);
    }
    return result;
  };

// Pipeline using reduce
const pipeline2 = (...fns) =>
  fns.reduce(
    (result, f) =>
      (...args) =>
        f(result(...args))
  );

// pipeline2 in simplest form
const pipeline3 = (...fns) => fns.reduceRight(samplePipe);
// pipeline to apply the functions in the order passed
const pipeline4 = (...fns) => fns.reduce(samplePipe);

const countNegative = (args) => args.length;
const filterNegative = (args) => args.filter(isNegative);

// console.log("Imperative Pipeline:", pipeline1(filterNegative, countNegative)(arr2));
// console.log("Reduce Pipeline:", pipeline2(filterNegative, countNegative)(arr2));

console.log(
  "pipeline with reduceRight, functions are applied from R -> L:",
  pipeline3(countNegative, filterNegative)(arr2)
);

console.log(
  "pipeline with reduce, functions are applied from L -> R:",
  pipeline4(filterNegative, countNegative)(arr2)
);

class City {
  constructor(name, pincode) {
    this.name = name;
    this.pincode = pincode;
  }

  getName() {
    return this.name;
  }

  getPincode() {
    return this.pincode;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setPincode(pincode) {
    this.pincode = pincode;
    return this;
  }
}

const city1 = new City();
city1.setName("Bengaluru").setPincode("560099");

console.log("Chaining with classes:", city1.getName(), city1.getPincode());

// Compose with 2 functions
const compose =
  (f, g) =>
  (...args) =>
    f(g(...args));

// Compose using reduceRight with pipe for variadic functions
// compose with reduceRight executes the functions from right to left
const compose2 = (...fns) => fns.reduceRight(samplePipe);

// compose with reduce executes the functions from left to right
const compose3 = (...fns) => fns.reduce(compose);

const removeNonAlpha = (str) => str.replace(/[^a-z]/gi, " ");
const splitInWords = (str) => str.split(/\s+/);
const arrayToSet = (arr) => new Set(arr);

const getUniqueWords = compose3(arrayToSet, splitInWords, removeNonAlpha);

const GETTYSBURG_1_2 = `Four score and seven years ago
our fathers brought forth on this continent,
a new nation, conceived in Liberty, and dedicated to
the proposition that all men are created equal.
Now we are engaged in a great civil war, testing whether
that nation, or any nation so conceived and dedicated,
can long endure.`;

console.log("Get uniqueWords", getUniqueWords(GETTYSBURG_1_2));

// Recursion

// 1. Decrease and Conquer: Searching, powerN
const search = (arr, key) =>
  arr.length && (arr[0] === key || search(arr.slice(1), key));

console.log("Search with decrease and conquer:", search(arr3, 4));

const powerN = (base, power) => {
  if (power === 0) {
    return 1;
  } else if (power % 2) {
    // odd power
    return base * powerN(base, power - 1);
  } else {
    // even power
    return powerN(base * base, power / 2);
  }
};

console.log("PowerN with decrease and conquer:", powerN(4, 4));

// 2. Devide and Conquer: Tower of Hanoi, Sorting
const hanoi = (disks, from, to, extra) => {
  if (disks === 1) {
    console.log(`Move disk 1 from post ${from} to post ${to}`);
  } else {
    hanoi(disks - 1, from, extra, to);
    console.log(`Move disk ${disks} from post ${from} to post ${to}`);
    hanoi(disks - 1, extra, to, from);
  }
};

console.log("Tower of Hanoi:", hanoi(4, "A", "B", "C"));

const quicksort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const smaller = arr.slice(1).filter((x) => x < pivot);
    const greaterEqual = arr.slice(1).filter((x) => x >= pivot);

    return [...quicksort(smaller), pivot, ...quicksort(greaterEqual)];
  }
};

console.log("Quick Sort", quicksort([22, 9, 60, 12, 4, 56]));

// 3. Dynamic Programming
const makeChange = memoize2((n, bills) => {
  if (n < 0) {
    return 0; // no way of paying negative amounts
  } else if (n == 0) {
    return 1; // one single way of paying $0: with no bills
  } else if (bills.length == 0) {
    // here, n > 0
    return 0; // no bills? no way of paying
  } else {
    return makeChange(n, bills.slice(1)) + makeChange(n - bills[0], bills);
  }
});

console.log("Pay 64 in:", makeChange(64, [100, 50, 20, 10, 5, 2, 1]), "ways");

// Immutability

// only freeze the object's own properties; don't mess with the prototype of the object
const deepFreeze = (obj) => {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) => deepFreeze(obj[prop]));
  }
  return obj;
};

// Copying an object or array
// const myObj = { a: "hello" };
// let newObject1 = Object.assign({}, myObj);
// let newObject2 = { ...myObj };

// let myArray = [1, 2, 3, 4];
// let newArray1 = myArray.slice();
// let newArray2 = [...myArray];

// Create a deep copy of an object
const deepCopy = (obj) => {
  let aux = obj;
  if (obj && typeof obj === "object") {
    aux = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach(
      (prop) => (aux[prop] = deepCopy(obj[prop]))
    );
  }
  return aux;
};

const getField = (attr) => (obj) => obj[attr];

const getByPath = (arr, obj) => {
  if (arr[0] in obj) {
    return arr.length > 1
      ? getByPath(arr.slice(1), obj[arr[0]])
      : deepCopy(obj[arr[0]]);
  } else {
    return undefined;
  }
};

let myObj3 = {
  d: 22,
  m: 9,
  o: { c: "MVD", i: "UY", f: { a: 56 } },
};
deepFreeze(myObj3);

console.log(getByPath(["d"], myObj3));
console.log(getByPath(["o"], myObj3));
console.log(getByPath(["o", "c"], myObj3));
console.log(getByPath(["o", "f", "a"], myObj3));

const setByPath = (arr, value, obj) => {
  if (!(arr[0] in obj)) {
    obj[arr[0]] = arr.length === 1 ? null : Number.isInteger(arr[1]) ? [] : {};
  }
  if (arr.length > 1) {
    return setByPath(arr.slice(1), value, obj[arr[0]]);
  } else {
    obj[arr[0]] = value;
    return obj;
  }
};

// Takes an frozen object and deep copies and sets the value and returns the frozen object back
const updateObject = (arr, obj, value) => {
  let newObj = deepCopy(obj);
  setByPath(arr, value, newObj);
  return deepFreeze(newObj);
};

let new1 = updateObject(["m"], myObj3, "sep");
let new2 = updateObject(["b"], myObj3, 220960);
let new3 = updateObject(["o", "f", "a"], myObj3, 9999);
let new4 = updateObject(["o", "f", "j", "k", "l"], myObj3, "deep");

console.log({ myObj3 }, { new1 }, { new2 }, { new3 }, { new4 });

// Desing patterns - Functional way
// Coupling - Interdependance between two modules
// Cohesiveness - the degree to which all components of a module really belong together
// Low coupling and high cohesiveness are good goals for software design because they imply that
// related things are close by and unrelated ones are separate.

// Functors and mondas
// Wrapping a value - basic container
const VALUE = Symbol("value");

class Container {
  constructor(x) {
    this[VALUE] = x;
  }

  map(fn) {
    return fn(this[VALUE]);
  }

  static of(x) {
    return new Container(x);
  }

  toString() {
    return `${this.constructor.name}(${this[VALUE]})`;
  }
  valueOf() {
    return this[VALUE];
  }
}

// enhance the container with the functors
// A functor is just some kind of container that allows applying
// .map() to its contents, producing a new container of the same type
class Functor extends Container {
  static of(x) {
    return new Functor(x);
  }

  map(fn) {
    return Functor.of(fn(this[VALUE]));
  }
}

// Dealing with missing values with Maybe
class Nothing extends Functor {
  isNothing() {
    return true;
  }

  toString() {
    return "Nothing()";
  }

  map(fn) {
    return this;
  }
}

class Just extends Functor {
  isNothing() {
    return false;
  }

  map(fn) {
    return Maybe.of(fn(this[VALUE]));
  }
}

class Maybe extends Functor {
  constructor(x) {
    return x === undefined || x === null ? new Nothing() : new Just(x);
  }

  static of(x) {
    return new Maybe(x);
  }
}

const plus1 = (x) => x + 1;
console.log(Maybe.of(2209).map(plus1).map(plus1).toString());
console.log(Maybe.of(null).map(plus1).map(plus1).toString());

export { once, onceAndAfter };
