// Scope: Where to look for variables
// smallest atomic unit of scope is function

// named function expression
var function_1 = function foo() {
  var foo = 1;
};

function_1();
// Reference error, foo() is not directly accessible, it is assigned to function_1
// foo();

// Cheating the lexical scope using eval()
var bar = 'bar';
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
var foo = 'foo';
(function IIFE() {
  var foo = 'foo2';
  console.log(`IIFE, value is: ${foo}`);
})(); // '()' can be enclosed within parantheses as well (fn(){...}())

// It prints the value from global scope, value with in IIFE is private
// console.log(foo);

// IIFE can take params
(function IIFE1(bar) {
  var foo = bar;
  console.log(`IIFE, value set from param is: ${foo}`);
})(foo);

// ES6 block scoping with let
let block1 = 10;


