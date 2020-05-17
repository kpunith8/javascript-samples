"use strict";

// ADVANCED JS: KYLE SIMPSON
// Scope: Where to look for variables
// smallest atomic unit of scope is function

// Function expression
// function expressions ends with a semicolon
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
  console.log(bar); // prints 43, str is evaluated and 'bar' gets assigned with 42
}

// function_2('var bar = 42;');

// eval() is going to slow down the performance of the JS engine by adding
// additional enforcement on scoping of its variables
// don't consider using with() -> it creates new variable scopes for new declarations
// with 'strict' mode, with() cannot be used.

// IIFE - Immediately Invoked function expression
// anything within IIFE will be private, and is not exposed
var foo = "foo";
(function IIFE() {
  var foo = "foo2";
  console.log(`IIFE, value is: ${foo}`);
})(); // '()' can be enclosed within parentheses as well (fn(){...}())

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
    console.log(`Variable within IIFE has ${privateVariable}`);
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
// astexplorer.net - to see Abstract Syntax Tree for JS code

// Each function has its own execution context
// Each execution context has its own variable environment, this, and arguments
function testData() {
  var height = 10; // use strict won't allow this without var, const or let for variable declaration
  console.log(height);
}

// function expressions can be immediately executed not the function declaration
// it can be achieved with IIFE
const getName = (function() {
  return "Punith";
})();

console.log("Execute function expression immediately", getName);

// Objects and this
const obj2 = {
  a: {
    name: "a",
    logo: "a-logo",
    // ES6 - new way of writing functions
    getNameAndLogo() {
      return `${this.name} ${this.logo}`;
    },
    getName: function() {
      return `${this.name}`;
    }
  },
  b: {
    name: "b",
    logo: "b-logo"
  }
};

console.log(`access objects with bracket notation, name: ${obj2["a"].getName()}
name and logo: ${obj2["a"].getNameAndLogo()}`);

var name = "Punith";

function importantPerson() {
  console.log("Reuse 'this' in objects:", this.name);
}

const obj3 = {
  name: "Cassy",
  importantPerson: importantPerson
};

const obj4 = {
  name: "Ryan",
  importantPerson: importantPerson
};

obj3.importantPerson();
obj4.importantPerson();

const obj5 = {
  name: "Billy",
  sing() {
    console.log("sing, this", this);

    // try with anotherFunc = function() {}, this -> undefined
    // arrow functions are lexically bound to the surrounding object, in this case obj5
    const anotherFunc = () => {
      console.log("anotherFunc, arrow function", this);
    };
    anotherFunc();
  }
};

obj5.sing();

const obj6 = {
  name: "Billy",
  sing() {
    console.log("sing, this", this);

    // or var self = this to access the this inside the function
    const anotherFunc = function() {
      console.log("anotherFunc.bind(this)", this);
    };
    return anotherFunc.bind(this); // binding this to anotherFunc
  }
};

obj6.sing()();

// call(), apply(), and bind()
const wizard = {
  name: "Merlin",
  health: 50,
  heal(power1, power2) {
    return (this.health += power1 + power2);
  }
};

const archer = {
  name: "Robin Hood",
  health: 30
};

console.log("Archer before call()", archer);
// Borrow some health from wizard to archer using call()
// call can take params as its second param
// wizard.heal.call(archer, 30, 30)

// apply() is similar to the call only the difference is, it accepts second param as array
wizard.heal.apply(archer, [50, 30]);

console.log("Archer after call/apply", archer);

// bind() can be used same as call(), one difference it returns an function for later execution
const healArcher = wizard.heal.bind(archer, 110, 30);
console.log("heal with bind():", healArcher());

// function currying with bind()
function multiply(a, b) {
  // arrow function can also be used
  return a * b;
}

const multiplyByTwo = multiply.bind(null, 2); // this can be passed as first param
console.log("multiplyByTwo(11):", multiplyByTwo(11));

// type of a Function () and Array [] is an Object

// Pass by reference v/s pass by value
// primitive types are pass by value
// Objects are pass by reference
let aa = 5;
let bb = aa; // value is passed not the reference of aa, value is copied to bb
// they have different memory allocated to them

bb++;

console.log("Pass by value: aa:", aa, "bb:", bb);

let obj7 = {
  name: "Punith",
  age: 30,
  address: { street: "A", city: "Bengaluru" }
};
let obj8 = obj7; // Here the reference of obj7 copied to obj8
// Here it is passed as pass by reference
// Changing the name property of obj8 will change the obj7's name too
// obj8 refers to the address of obj7
obj8.name = "Puni";
console.log(
  "Pass by reference, obj7.name:",
  obj7.name,
  "obj8.name:",
  obj8.name
);

// copy the object without making changes to original object use, Object.assign({}, targetObj)
// Or can be done with spread(...) operator
// It clones shallow copy not the deep copy
let obj9 = Object.assign({}, obj7);
let obj10 = { ...obj7, name: "Jerry" };
let deepClone = JSON.parse(JSON.stringify(obj7));

// This change will mutate address property of Object.assign and spread way of copying the objects
// here obj9, obj7, and obj10 will have same street
obj10.address.street = "First Cross";

// Deep clone can be achieved with JSON.parse(JSON.stringify(obj))
obj9.name = "Shiri";

console.log(
  "Original object:",
  obj7,
  "Copy array with Object.assign():",
  obj9,
  "Copy with spread operator:",
  obj10,
  "Deep copy of an object with JSON.parse(JSON.stringify()):",
  deepClone
);

// And same applies for the arrays as well
let arr1 = [1, 2, 3, 4, 5];
let arr2 = arr1;

// Push an item to arr2, it gets added to arr1 as well, because of pass by reference
arr2.push(100);

console.log("Pass by reference for an array, arr1:", arr1, "arr2:", arr2);

// To get fresh copy without making changes to original array use, concat() or spread operator
let arr3 = [].concat(arr1);
arr3.push(101);

let arr4 = [...arr1];
arr4.push(102);

console.log(
  "Copy the array without reference, arr1:",
  arr1,
  "arr3 with concat():",
  arr3,
  "arr4 with spread operator:",
  arr4
);

// Closure - Advantages
// Memory efficient
// Without closure
function getArrayItemAt(index) {
  const bigArray = new Array(7000).fill('*');

  console.log('Array created, normal function');
  return bigArray[index];
}

// Creates the array each time function called
// assume it is needs lot of memory to creat or execute
console.log(getArrayItemAt(600));
console.log(getArrayItemAt(700));
console.log(getArrayItemAt(800));

// with closure
// It remembers the variables with in th scope and reuses it.
// Creates the array only once
function getArrayItemAtWithClosure() {
  const bigArray = new Array(7000).fill('*');

  console.log('Array created, with closure');
  return function(index) {
    return bigArray[index];
  }
}

const getArrayItem = getArrayItemAtWithClosure();
console.log(getArrayItem(300));
console.log(getArrayItem(400));
console.log(getArrayItem(500));







