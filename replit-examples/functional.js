import axios from "axios";
import { Map } from "immutable";
import moment from "moment";

// Add function inspired by lodash
function baseToNumber(value) {
  if (typeof value === "number") {
    return value;
  }

  return +value;
}

// 1. Higher order function can be used for other basic math operations
// A higher order function is a function that takes or returns a function.
const createMathOperation = (operatorFn, defaultValue) => {
  return (value, other) => {
    value = baseToNumber(value);
    other = baseToNumber(other);
    return operatorFn(value, other);
  };
};

let addIt = createMathOperation(
  (firstValue, secondValue) => firstValue + secondValue,
  0
);
const multiply = createMathOperation(
  (firstValue, secondValue) => firstValue * secondValue,
  1
);

console.log("add:", addIt(10, 5));
console.log("multiply:", multiply(3, 4));

// 2. Receive params from the invoking function `createResource`
const readUser = (opts) => {
  const { env, urls = [] } = opts;

  switch (env) {
    case "dev":
      return { env: "development", urls };
    case "prod":
      return { env: "production", urls };
    default:
      return { env: "test", urls };
  }
};

// readUser receives the param from here, returned value from
// readUser is returned with additional info back to createSingleResource
// That is finally used as res
const createResource = (fn) => {
  const data = fn(); // Args can be passed from here too, if they are common for all the cases

  return { data, name: "Punith K" };
};

const useSingleResource = (fn, params) =>
  createResource((opts) => fn({ ...params, ...opts }));

// This function is to give more control to the user using callback and passing
// additional params to the function is being invoked
const useResource = (fn) => {
  // transitionCallback can be passed only if consumer wants to update other data based on this data
  const createResourceTransition = (fnArgs, transitionCallback) => {
    // Pass fnArgs passed from the consumer to fn
    return createResource((opts) => fn({ ...fnArgs, ...opts }));
  };

  return createResourceTransition;
};

const userEnv = useSingleResource(readUser, {
  urls: ["http://idontknow.com"],
  env: "dev",
});

// Args can be passed to createResource from useSingleResource without passing args to useSingleResource()
const userEnvInlineArgs = useSingleResource((opts) =>
  readUser({ ...opts, ...{ urls: ["http://idontknow.com"] } })
);

const createUserEnvWithUrls = useResource(readUser);

// Pass URLs
const userEnvEmails = createUserEnvWithUrls({
  urls: ["http://google.com", "http://gmail.com"],
  env: "prod",
});

console.log({ userEnv, userEnvEmails, userEnvInlineArgs });

// Referernce: https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch1.md/#chapter-1-why-functional-programming
// Reference: https://mostly-adequate.gitbook.io/mostly-adequate-guide/

// Pure Function: A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect.
// Side effects: A side effect is a change of system state or observable interaction with the outside world that occurs during the calculation of a result.
console.log("\nPure function examples:");
// impure
let minimum = 21; // Any changes to minimum by other users would effect the result of checkAge()
const checkAgeImpure = (age) => age >= minimum;

// pure
const checkAgePure = (age) => {
  const minimum = 21;
  return age >= minimum;
};

// splice() - mutates the orginal array, use slice() instead - it doesn't mutate the original array

/*
Side effects may include, but are not limited to:
  - changing the file system
  - inserting a record into a database
  - making an http call
  - mutations
  - printing to the screen / logging
  - obtaining user input
  - querying the DOM
  - accessing system state

And any interaction with the world outside of a function is a side effect.
*/
// pure functions can always be cached by input. This is typically done using a technique called memoization
const memoize = (f) => {
  const cache = {};

  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  };
};

const squareNumber = memoize((x) => x * x);

console.log("memoize:", squareNumber(4)); // 16
console.log("memoized value returned:", squareNumber(4)); // 16, returns cache for input 4

// Memoizing a function
// Transform some impure functions into pure ones by delaying evaluation,
// here it doesn't cache the results of the http call, rather it caches the generated function.
const pureHttpCall = memoize((url, params) => () => axios.get(url, params));

// pureHttpCall('https://jsonplaceholder.typicode.com/todos/1')()
// .then(res => console.log(res.data))
// .catch(err => console.error(err))

// pureHttpCall('https://jsonplaceholder.typicode.com/todos/2')()
// .then(res => console.log(res.data))
// .catch(err => console.error(err))

// Reducing code
const jobe = Map({ name: "Jobe", hp: 20, team: "red" });
const michael = Map({ name: "Michael", hp: 20, team: "green" });
const decrementHP = (p) => p.set("hp", p.get("hp") - 1);
const isSameTeam = (p1, p2) => p1.get("team") === p2.get("team");
const punch = (a, t) => (isSameTeam(a, t) ? t : decrementHP(t));

console.log("Unnecessary code:", punch(jobe, michael).toJSON());

// Inline the isSameTeam function
// const punch = (a, t) => (a.get('team') === t.get('team') ? t : decrementHP(t));

// Since our data is immutable, we can simply replace the teams with their actual value
// const punch = (a, t) => ('red' === 'green' ? t : decrementHP(t));

// We see that it is false in this case so we can remove the entire if branch
// const punch = (a, t) => decrementHP(t);

// And if we inline decrementHP, we see that, in this case, punch becomes a call to decrement the hp by 1
const punch1 = (a, t) => t.set("hp", t.get("hp") - 1);

console.log("Reduced code:", punch1(michael, jobe).toJSON());

// Parallelism
// We can run any pure function in parallel since it does not need access to shared memory and it cannot,
// by definition, have a race condition due to some side effect

// Currying
// Call a function with fewer arguments than it expects. It returns a function that takes the remaining arguments.

// Curry helper function
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      // `bind` attaches `this` and returns the function and it needs to be invoked separately
      return $curry.bind(null, ...args);
    }
    // `call` attaches `this` into function and executes the function immediately
    return fn.call(null, ...args);
  };
}

function curry1(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function curry2(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return function (...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

function sum(a, b, c) {
  return a + b + c;
}

// let curriedSum = curry1(sum);
let curriedSum = curry(sum);

curriedSum(1, 2, 3); // 6, still callable normally
curriedSum(1)(2, 3); // 6, partial currying of 1st arg
curriedSum(1)(2)(3); // 6, full currying

// Last argument in the callback fn to be passed to curry should be the data to be operated on,
// common algorithms/logic to be applied, should be passed as first, second arguments, and so on.

const add2 = (x) => (y) => x + y;
const increment = add2(1);
const addTen = add2(10);

console.log("\nCurrying examples:");
console.log("increment by 1:", increment(2));
console.log("add 10:", addTen(2));

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));

console.log(
  `Match 'r' in the string passing both args:`,
  match(/r/g, "hello world")
);

const hasLetterR = match(/r/g); // x => x.match(/r/g)
console.log(
  `Match 'r' in the string passing second arg to curried function hasLetter():`,
  hasLetterR("hello world")
);

console.log(
  `No match of 'r' in the string passing second arg to curried function hasLetter():`,
  hasLetterR("just j and s and t etc")
);

console.log(
  `Filter the strings having 'r' in them(pass both args):`,
  filter(hasLetterR, ["rock and roll", "smooth jazz"])
);

const removeStringsWithoutRs = filter(hasLetterR); // xs => xs.filter(x => x.match(/r/g))

console.log(
  `Remove strings without 'r's (Pass second param to curried fn):`,
  removeStringsWithoutRs(["rock and roll", "smooth jazz", "drum circle"])
);

const noVowels = replace(/[aeiou]/gi); // (r,x) => x.replace(/[aeiou]/ig, r)
const censored = noVowels("*"); // x => x.replace(/[aeiou]/ig, '*')
console.log(`Replace vowels with *:`, censored("Chocolate Rain"));

// Currying helps to "pre-load" a function with an argument or two in order to receive a new function that remembers those arguments.

// Curried version to get the object property
const user = {
  name: "Punith K",
  email: "kpunith8@gmail.com",
};

const prop = curry((property, object) => object[property]);

const getName = prop("name");

console.log("Get property of an object:", getName(user));

// Composition
// Compose utility function for variadic arguments
const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// compose utility with pipeline using reduce and reduceRight

const pipe =
  (f, g) =>
  (...args) =>
    g(f(...args));
// const reduceRLPipe = (f, g) => (...args) => f(g(...args))

// compose with reduce executes the functions from right to left
const composeLR = (...fns) => fns.reduce(pipe);

// compose with reduceRight executes the functions from left to right
const composeRL = (...fns) => fns.reduceRight(pipe);

// Simple compose for 2 params

// g(x) is executed first then the f(g(x)) - compose in maths is applied
// from right to left, mathametically this version is correct
const compose2 = (f, g) => (x) => f(g(x));
// f and g are functions and x is the value being "piped" through them.

// Reverse the order to apply from left to right
const composeRevesre = (f, g) => (x) => g(f(x));

const toUpperCase = (x) => x.toUpperCase();
const exclaim = (x) => `${x}!`;
const shout = compose2(toUpperCase, exclaim);
const shoutRL = composeRL(toUpperCase, exclaim, exclaim);

console.log("\nComposition examples:");
console.log(
  `Convert to uppercase adding '!' to the end:`,
  shout("send in the clowns")
);

console.log(
  `Compose RL: Convert to uppercase adding '!!' to the end:`,
  shoutRL("send in the clowns")
);

// without compose above would look like
// const shout = x => exclaim(toUpperCase(x));

// associativity
// compose(f, compose(g, h)) === compose(compose(f, g), h);
const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));

const head = (x) => x[0];
const reverse = reduce((acc, x) => [x, ...acc], []);
// Use compose instead
const lastRL = composeRL(head, reverse);
const lastLR = composeLR(reverse, head);

console.log(
  "Compose left to right: Reverse the array and pick the first item in the array:",
  lastRL(["jumpkick", "roundhouse", "uppercut"])
);

console.log(
  "Compose right to left: Reverse the array and pick the first item in the array:",
  lastLR(["jumpkick", "roundhouse", "uppercut"])
);

// Different ways to compose the same
/*
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

// -- or

const last = compose(head, reverse);
const loudLastUpper = compose(exclaim, toUpperCase, last);

// -- or

const last = compose(head, reverse);
const angry = compose(exclaim, toUpperCase);
const loudLastUpper = compose(angry, last);
*/

// Pointfree style
// Pointfree style means never having to say your data. It means functions that
// never mention the data upon which they operate. First class functions,
// currying, and composition all play well together to create this style

// not pointfree because we mention the data: word
const snakeCase = (word) => word.toLowerCase().replace(/\s+/gi, "_");

const toLowerCase = (s) => s.toLowerCase();

// pointfree style
const snakeCase1 = compose(replace(/\s+/gi, "_"), toLowerCase);
// here replace is partially applied

console.log(`Snake case using pointfree style:`, snakeCase1("Hello there"));

// not pointfree because we mention the data: name
const initials = (name) =>
  name.split(" ").map(compose(toUpperCase, head)).join(". ");

const intercalate = curry((str, xs) => xs.join(str));
const split = curry((sep, str) => str.split(sep));

// pointfree
const initials1 = compose(
  intercalate(". "),
  map(compose(toUpperCase, head)),
  split(" ")
);

console.log(
  "Capitalize the first word of a string:",
  initials1("hunter stockton thompson")
);

// 3.2 Debugging
const angry = compose(exclaim, toUpperCase);

// A common mistake is to compose something like map, a function of two arguments, without first partially applying it.

// const latin = compose(map, angry, reverse);
// latin(['frog', 'eyes']); // error

// it should be fixed with
// const latin = compose(map(angry), reverse);

// To debug a composition, we can use their impure trace function to see what's going on

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

// Will throw TypeError: Cannot read property 'apply' of undefined, because we need to map, toLowerCase since it's working on an array.
// const dasherize = compose(
//   intercalate('-'),
//   toLower,
//   split(' '),
//   replace(/\s{2,}/ig, ' '),
// );

// Compose trace helper and debug what's happening
const dasherize = compose(
  intercalate("-"),
  map(toLowerCase),
  // trace('after split'),
  split(" "),
  replace(/\s{2,}/gi, " ")
);

console.log("Dasherize strings:", dasherize("The world is a vampire"));

// 4. Functors
// Functor is simply an interface with a contract.
// Container to hold any value
class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}
console.log("\nFunctor examples");
console.log(
  "Container:",
  Container.of(3),
  Container.of(Container.of({ name: "yoda" }))
);

// Functor to map through the $value inside the container
Container.prototype.map = function (f) {
  return Container.of(f(this.$value));
};

const concat = curry((a, b) => a.concat(b));
const flip = curry((fn, a, b) => fn(b, a));
const append = flip(concat);

console.log(
  "map functor on container with a number:",
  Container.of(2).map((two) => two + 2)
);

console.log(
  "map functor on container with a string:",
  Container.of("flamethrowers").map((s) => s.toUpperCase())
);

console.log(
  "map functor on container with a string append:",
  Container.of("bombs").map(append(" away")).map(prop("length"))
);

// It allows to work with our value without ever having to leave the Container

// Maybe looks a lot like Container with one minor change: it will first check to see if it has a value before calling the supplied function. This has the effect of side stepping those pesky nulls as we map
class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  constructor(x) {
    this.$value = x;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  inspect() {
    return this.isNothing ? "Nothing" : `Just(${inspect(this.$value)})`;
  }
}

const add = curry((a, b) => a + b);

console.log(
  "Maybe on non null value:",
  Maybe.of("Malkovich Malkovich").map(match(/a/gi))
);

console.log("Maybe on null:", Maybe.of(null).map(match(/a/gi)));

console.log(
  "Maybe on object, age property is not present :",
  Maybe.of({ name: "Boris" }).map(prop("age")).map(add(10))
);

console.log(
  "Maybe on object, age property is present:",
  Maybe.of({ name: "Dinah", age: 14 }).map(prop("age")).map(add(10))
);

// Notice our app doesn't explode with errors as we map functions over our null values.

// Example used with compose and map

const mapFunctor = curry((f, anyFunctor) => anyFunctor.map(f));

const safeHead = (xs) => Maybe.of(xs[0]);

const streetName = compose(
  mapFunctor(prop("street")),
  safeHead,
  prop("addresses")
);

console.log(
  "Functor: composing with map a null value:",
  streetName({ addresses: [] })
);

console.log(
  "Functor: composing with map with non null value:",
  streetName({ addresses: [{ street: "Shady Ln.", number: 4201 }] })
);

// Releasing the value from Maybe or Contaier functors
const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }

  return f(m.$value);
});

// Example to return Nothing to indicate error
const withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null)
);

const updateLedger = (account) => account;

const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// could be, compose(remainingBalance, updateLedger);
const finishTransaction = compose(remainingBalance);

// returns Maybe
// const getTwenty = compose(mapFunctor(finishTransaction), withdraw(20));
//
const getTwenty = compose(
  maybe(`You're broke!`, finishTransaction),
  withdraw(20)
);

console.log(
  "Functor: withdraw when you have enough balance:",
  getTwenty({ balance: 200.0 })
);

console.log(
  "Functor: withdraw when you do not have enough balance:",
  getTwenty({ balance: 10.0 })
);

// 4.1 Pure Error Handling

// Either used as a Container wrapping the Right value
class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

class Left extends Either {
  map(f) {
    return this;
  }

  inspect() {
    return `Left(${inspect(this.$value)})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
  }

  inspect() {
    return `Right(${inspect(this.$value)})`;
  }
}

const left = (x) => new Left(x);

const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, "YYYY-MM-DD");

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, "years"))
    : left("Birth date could not be parsed");
});

console.log(
  "Error handling: Right with a proper value",
  getAge(moment(), { birthDate: "2005-12-12" })
);

console.log(
  "Error handling: Left with error",
  getAge(moment(), { birthDate: "July 4, 2001" })
);

// Extract the value from either
// Expects instance of Either(e) and needs function to return the each value Right(g), Left(f)
const either = curry((f, g, e) => {
  let result;

  switch (e.constructor) {
    case Left:
      result = f(e.$value);
      break;

    case Right:
      result = g(e.$value);
      break;

    // No Default
  }

  return result;
});

const toString = String;
// Identity function
const id = (id) => id;

const fortune = compose(
  concat("If you survive, you will be "),
  toString,
  add(1)
);

const zoltar = compose(console.log, either(id, fortune), getAge(moment()));

console.log("Either: extract the result:", zoltar({ birthDate: "2005-12-12" }));

console.log("Either: extract the error:", zoltar({ birthDate: "balloons!" }));

// 5. Monads

// Monads are pointed functors that can flatten

// A pointed functor is a functor with an 'of' method

const safeProp = curry((x, obj) => Maybe.of(obj[x]));

const safeHead1 = safeProp(0);

const firstAddressStreet = compose(
  map(map(safeProp("street"))),
  map(safeHead1),
  safeProp("addresses")
);
console.log("\nMonads examples");
console.log(
  firstAddressStreet({
    addresses: [
      { street: { name: "Mulburry", number: 8402 }, postcode: "WC2N" },
    ],
  })
);

Maybe.prototype.join = function join() {
  return this.isNothing() ? Maybe.of(null) : this.$value;
};

// Join function to extract the value from multiple wrappers
// const join = mma => mma.join();

// const firstAddressStreet1 = compose(
//   join,
//   map(safeProp('street')),
//   join,
//   map(safeHead1), safeProp('addresses'),
// );

// console.log("Extract values using monads:", firstAddressStreet1({
//   addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
// }));
