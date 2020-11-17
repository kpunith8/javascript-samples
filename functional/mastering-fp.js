// Mastering JS Functional Programming - Kereki Fedrico

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
const greet = msg => console.log(`Greet ${msg}`)

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
      done = false
      g(...args);
    }
  };
};

const showMessage1 = () => console.log(`1`);
const greet1 = () => console.log(`2`)
const alternativeFn = alternator(showMessage1, greet1)
alternativeFn()
alternativeFn()
alternativeFn()
alternativeFn()

module.exports = { once, onceAndAfter };
