'use strict';

// ADVANCED JS: KYLE SIMPSON
// Scope: Where to look for variables
// smallest atomic unit of scope is function

// named function expression
var function_1 = function foo() {
  var foo = 1;
  console.log(foo);
};

function_1();
// Reference error, foo() is not directly accessible, it is assigned to function_1
// foo();

// Cheating the lexical scope using eval()
var bar = "bar";
function function_2(str) {
  eval(str); // adds the 'bar' to function scope, passed as str to function_2
  console.log(bar); // prints 43, str is evaluated and 'bar' gets assinged with 42
}

// function_2('var bar = 42;');

// eval() is going to slow down the performance of the JS engine by adding
// additional enforment on scoping of its variables
// don't consider using with() -> it creates new variable scopes for new declartions
// with 'strict' mode, with() cannot be used.

// IIFE Pattern - Immediately Invoked function expression
// anything within IIFE will be private, and is not exposed
var foo = "foo";
(function IIFE() {
  var foo = "foo2";
  console.log(`IIFE, value is: ${foo}`);
})(); // '()' can be enclosed within parantheses as well (fn(){...}())

// It prints the value from global scope, value with in IIFE is private
// console.log(foo);

// IIFE can take params
(function IIFE1(bar) {
  var foo = bar;
  console.log(`IIFE, value set from param is: ${foo}`);
})(foo);

let myModule = (function() {
  const privateVariable = "Data";

  const privateMethod = () => {
    console.log(`Varibale within IIFE has ${privateVariable}`);
  };

  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();

// As it is IIFE, the code is immediately executed, and the returned object is
// assigned to the `myModule` variable.
// Due to closures, the returned object can still access the functions and
// variables defined inside the IIFE even after when IIFE has finished.

// Invoke the public method which inturn calls private method inside the myModule
myModule.publicMethod();

// ES6 block scoping with let, bound to the scope it is declared in
let block1 = 10;

/* Dynamic scoping - runtime decision */

/* Hoisting: All functions are hoisted to top then the variable declations, function expression will not be hoisted */

/* Every function, while executing, has a refrence to its current exection context, called 'this' */

/* Closures: when a function remembers the lexical scope when the function is executed outside that lexical scope */
function closureFoo() {
  var bar = "bar";
  function baz() {
    console.log(`closure, remembers the lexical scope: ${bar}`);
  }

  // baz is passed as reference to outside function, and still remembers the its scope
  // and accesses bar variable outside the invokiing scope
  outsideFunction(baz);
}

function outsideFunction(baz) {
  baz(); // though called outside its lexical scope, still it can access another scope closureFoo's bar function
}

closureFoo();

/* functions can be returned from a function */
function closure1() {
  var bar = "bar";
  return function() {
    console.log(`Returning function within closure: ${bar}`);
  };
}

function outsideFunction1() {
  closure1()();
}

outsideFunction1();

/* It prints 6 five times since value in the scope is already 6 before the setTimeout executed */
// for (var i = 1; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(`i: ${i}`);
//   }, i * 1000);
// }

/* Above problem can be fixed using IIFE as follows
or declare let instead of var inside for loop in the above example*/
// for (var i = 1; i <= 5; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(`i: ${i}`);
//     }, i * 1000)
//   })(i);
// }

// Classic module pattern:
// 1. there would be outer enclosing function
// 2. one or more functions get retunned from the function call,
// one or more innner functions have closure over inner private scope
var closure2 = (function() {
  var o = { bar: "bar" };

  // return {
  //   bar: function () {
  //     console.log(`Module pattern: ${o.bar}`);
  //   }
  // };
  // it can also be written by assigning to a variable to modify things later
  const publicAPI = {
    bar: function() {
      publicAPI.baz();
    },
    baz: function() {
      console.log(`Module pattern ${o.bar}`);
    }
  };

  return publicAPI;
})();

// closure2 is pointing to bar function returned
// it hides other details within the IIFE or enclosed function
// helpful in using the private variables to return function with modified data
// parameters can also be passed to the module pattern
closure2.bar();

/* OOP - in JS */
// Every single object is built by a constructor function
// each time a constructor is called, a new object is created
// A constructor makes an object "linked to" its own "prototype"

function OOPExample(who) {
  this.me = who;
}

OOPExample.prototype.identity = function() {
  return `I'm ${this.me}`;
};

var a1 = new OOPExample("Punith");
var a2 = new OOPExample("Sahana");

a2.speak = function() {
  console.log(`Hello ${this.identity()}`); // this referes to OOPExample
};

a2.speak();

// property has same name as in prototype needs explicit referernce to this
// a1.identity = function() {
//   // called shadowing
//   console.log(`Hello, ${OOPExample.prototype.identity.call(this)}`);
// };

// a1.identity();

function OOPExample1(who) {
  OOPExample.call(this, who); // Inherits from OOPExample calling this on it
}

// OOPExample1 can be initialized as follows
// OOPExample1.prototype = new OOPExample(); // or
OOPExample1.prototype = Object.create(OOPExample.prototype);

OOPExample1.prototype.speak1 = function() {
  console.log("Called with in OOPExample1:", this.identity());
};

var b1 = new OOPExample1("Punith K");
b1.speak1();

console.log("Get the prototype of an object:", Object.getPrototypeOf(a1));

// Other way of creating child classes using delegation inheriting the parent prototype
// OLOO: Object Linked to Other Objects
let OOPFoo = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return `I'm ${this.me}`;
  }
};

let OOPBar = Object.create(OOPFoo);
OOPBar.speak = function() {
  console.log(`Hello ${this.identify()}`);
};

let b11 = Object.create(OOPBar);
b11.init("b11");
let b12 = Object.create(OOPBar);
b12.init("b12");

b11.speak();
b12.speak();

console.log(
  "a1.constructor === OOPExample",
  ":",
  a1.constructor === OOPExample
);
console.log(
  "a1.constructor === a2.constructor",
  ":",
  a1.constructor === a2.constructor
);
console.log(
  "a1.__proto__ === OOPExample.prototype",
  ":",
  a1.__proto__ === OOPExample.prototype
);
console.log(
  "a1.__proto__ === a2.__proto__",
  ":",
  a1.__proto__ === a2.__proto__
);
console.log(
  "a1.__proto__ === Object.getPrototypeOf(a1)",
  ":",
  a1.__proto__ === Object.getPrototypeOf(a1)
);
console.log(
  "a2.__proto__ === a2.constructor.prototype",
  ":",
  a2.__proto__ === a2.constructor.prototype
);

// ASYNC PATTERNS

// Nested callback tasks
function callbacksGetData(data, callback) {
  setTimeout(() => {
    callback(data);
  }, 2);
}

callbacksGetData(10, function(num1) {
  let x = num1 + 1;
  callbacksGetData(30, function(num2) {
    let y = num2 + 1;
    callbacksGetData(`Nested callbacks, Total: ${x + y}`, function(answer) {
      console.log(answer);
    });
  });
});

// Generators - async
function coroutine(g) {
  let it = g();
  return function() {
    return it.next.apply(it, arguments);
  };
}

let generatorsGetDataSync = coroutine(function*() {
  let x = 1 + (yield null);
  let y = 1 + (yield null);
  yield x + y;
});

generatorsGetDataSync();
generatorsGetDataSync(10);
console.log(`Total using sync generators: ${generatorsGetDataSync(30).value}`);

function getDataAsync(data) {
  setTimeout(() => generatorsGetDataAsync(data), 4);
}

let generatorsGetDataAsync = coroutine(function*() {
  let x = 1 + (yield getDataAsync(10));
  let y = 1 + (yield getDataAsync(30));
  let answer = yield getDataAsync(`Total using async generators: ${x + y}`);

  console.log(answer);
});

generatorsGetDataAsync();

// Promise
const promiseGetData = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 5);
  });
};

let x;

promiseGetData(10)
  .then(num1 => {
    x = 1 + num1;
    return promiseGetData(30);
  })
  .then(num2 => {
    let y = 1 + num2;
    return promiseGetData(`Total using Promise: ${x + y}`);
  })
  .then(answer => console.log(answer));


// Udemy course
// astexplorer.net - to see Abstarct Syntax Tree for JS code

// Each function has its own exection context
// Each execution context has its own variable environment, this, and arguments
function testData() {
  var height = 10; // use strict won't allow this without var, const or let for variable declation
  console.log(height)
}
