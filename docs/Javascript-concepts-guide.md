# JavaScript Concepts Directory Guide

## 📖 Overview

The `javascript/` directory covers core and advanced JavaScript language concepts, features, and best practices. This section is essential for understanding modern JavaScript development and mastering the language fundamentals.

---

## 📂 Files Breakdown

### 1. **js-basics.js**
Fundamental JavaScript concepts

**Topics Covered:**

#### Variables & Data Types
- `var`, `let`, `const` differences
- Primitive types: number, string, boolean, null, undefined, symbol, bigint
- Reference types: object, array, function
- Type coercion and conversion

#### Operators
- Arithmetic operators: `+`, `-`, `*`, `/`, `%`, `**`
- Assignment operators: `=`, `+=`, `-=`, etc.
- Comparison operators: `==`, `===`, `<`, `>`, etc.
- Logical operators: `&&`, `||`, `!`
- Bitwise operators: `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`

#### Control Flow
- `if`, `else if`, `else` statements
- `switch` statements with case matching
- Ternary operator `? :`
- Loops: `for`, `while`, `do...while`
- Loop control: `break`, `continue`

#### Functions
- Function declaration
- Function expression
- Arrow functions `() => {}`
- Function parameters and arguments
- Return statement and implicit returns

#### Scope
- Global scope
- Function scope
- Block scope (let/const)
- Scope chain and variable lookup
- Hoisting behavior

---

### 2. **advanced-js.js**
Advanced JavaScript patterns and concepts

**Topics Covered:**

#### Closures
- Function factories
- Data privacy
- Encapsulation patterns
- Module pattern

```javascript
function outer() {
  let privateVar = "secret";
  return function inner() {
    return privateVar;
  };
}
```

#### Higher-Order Functions
- Functions accepting functions as parameters
- Functions returning functions
- Function composition
- Decorators and wrappers

#### Context and `this`
- `this` in different contexts
- Method calls vs function calls
- `call()`, `apply()`, `bind()`
- Arrow functions and `this` binding
- Object method `this` binding

#### Prototypes and Inheritance
- Prototype chain
- `prototype` property
- `Object.create()`
- Constructor functions
- Prototype-based inheritance

#### Object-Oriented Patterns
- Constructor pattern
- Prototype pattern
- Factory pattern
- Singleton pattern
- Reveal module pattern

---

### 3. **es6-features.js**
Modern ES6+ JavaScript features

**Features Covered:**

#### Let and Const
- Block scoping behavior
- Temporal Dead Zone
- Const immutability (reference)

#### Arrow Functions
- Concise syntax
- Implicit returns
- `this` binding differences
- Use cases and limitations

#### Template Literals
- Backtick syntax
- String interpolation with `${}`
- Multi-line strings
- Tagged templates

#### Destructuring
- Object destructuring
- Array destructuring
- Nested destructuring
- Default values
- Rest elements

```javascript
// Object destructuring
const { name, age } = person;

// Array destructuring
const [first, second] = array;

// Rest elements
const [head, ...rest] = array;
```

#### Default Parameters
- Function parameter defaults
- Falsy vs undefined checks
- Computed defaults

#### Classes (ES6)
- Class syntax
- Constructor method
- Instance methods
- Static methods
- Getters and setters
- Inheritance with `extends`
- `super` keyword

#### Spread Operator
- Array spreading: `[...arr]`
- Object spreading: `{...obj}`
- Function argument spreading
- Copying arrays/objects

#### Rest Parameters
- `...` in function parameters
- Collecting arguments
- Combining with destructuring

#### For...of Loop
- Iterating iterables
- Arrays, strings, sets, maps
- Difference from for...in

#### Enhanced Object Literals
- Shorthand properties
- Computed property names
- Method shorthand
- Getters and setters

---

### 4. **async-javascript.js**
Asynchronous JavaScript patterns

**Topics Covered:**

#### Callbacks
- Function callbacks
- Callback hell/pyramid of doom
- Error handling in callbacks

#### Promises
- Promise states: pending, fulfilled, rejected
- `new Promise()` constructor
- `.then()` chaining
- `.catch()` error handling
- `.finally()` cleanup
- Promise static methods:
  - `Promise.all()` - wait for all
  - `Promise.race()` - fastest wins
  - `Promise.allSettled()` - all results
  - `Promise.any()` - first success

```javascript
Promise.all([promise1, promise2])
  .then(results => {})
  .catch(error => {});
```

#### Async/Await
- `async` function syntax
- `await` operator
- Error handling with try/catch
- Sequential vs concurrent execution

```javascript
async function fetchData() {
  try {
    const data = await fetch(url).then(r => r.json());
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

#### Event Loop
- Microtask queue
- Macrotask queue
- Execution order
- setTimeout vs setImmediate
- Promise microtasks

#### Concurrent Execution
- `Promise.all()` for parallel
- `Promise.allSettled()` for results
- Sequential with await
- Concurrent with Promise shortcuts

---

### 5. **array-ex.js**
Array methods and operations

**Iteration Methods:**
- `map()` - Transform elements
- `filter()` - Select elements
- `reduce()` - Aggregate values
- `forEach()` - Side effects
- `find()` - First match
- `findIndex()` - Index of first match
- `some()` - Any match
- `every()` - All match

**Transformation Methods:**
- `slice()` - Shallow copy
- `splice()` - Modify in place
- `concat()` - Combine arrays
- `flat()` - Flatten nested
- `flatMap()` - Map then flatten
- `reverse()` - Reverse order
- `sort()` - Sort elements
- `join()` - Convert to string

**Search Methods:**
- `indexOf()` - First index
- `lastIndexOf()` - Last index
- `includes()` - Contains check

**Creation Methods:**
- `Array.from()` - Convert to array
- `Array.of()` - Create from values
- `Array.isArray()` - Type check

**Performance Considerations:**
- Time complexity of operations
- When to use different methods
- Mutation vs immutability

---

### 6. **json-examples.js**
JSON parsing, serialization, and manipulation

**Key Concepts:**

#### JSON Format
- JSON data types: string, number, boolean, null, object, array
- Valid JSON vs JavaScript objects
- Key quoting requirements

#### Parsing and Stringifying
```javascript
// Parse JSON string to object
JSON.parse(jsonString);

// Convert object to JSON string
JSON.stringify(object);

// With replacer function
JSON.stringify(object, (key, value) => {});

// With space parameter
JSON.stringify(object, null, 2);
```

#### Handling Special Cases
- Undefined values in JSON
- Functions and symbols (not serializable)
- Circular references
- Date serialization

#### Custom Serialization
- Replacer functions
- ToJSON methods
- BigInt handling

---

### 7. **clean-code.js**
Clean code principles in JavaScript

**Principles Covered:**

#### Naming
- Meaningful variable names
- Descriptive function names
- Avoid cryptic abbreviations
- Pronounceable names

#### Functions
- Single Responsibility Principle
- Functions should do one thing
- Function length and complexity
- Parameter number limitation
- Default parameters

#### Variables
- Declare variables close to usage
- Const by default, let when needed
- Avoid magic numbers/strings
- Meaningful names

#### Comments
- Comments for why, not what
- Keep comments updated
- Avoid obvious comments
- TODO and FIXME markers

#### Error Handling
- Use exceptions, not error codes
- Try-catch blocks
- Meaningful error messages
- Logging best practices

#### Formatting
- Consistent indentation
- Line length limits
- Blank line usage
- Parentheses and braces

#### DRY Principle
- Don't Repeat Yourself
- Extract common patterns
- Reuse code
- Avoid duplication

---

### 8. **composible-javascript.js**
Function composition and functional patterns

**Key Concepts:**

#### Function Composition
- Combining simple functions
- Composition order
- Point-free style

```javascript
// Compose functions
const compose = (f, g) => x => f(g(x));
const add5 = n => n + 5;
const multiply2 = n => n * 2;
const composed = compose(add5, multiply2);
composed(3); // (3 * 2) + 5 = 11
```

#### Pipe Function
- Left-to-right composition
- More readable order
- Dataflow visualization

```javascript
const pipe = (f, g) => x => g(f(x));
```

#### Currying
- Function with multiple parameters
- Partial application
- Creates specialized functions

```javascript
const add = a => b => a + b;
const add5 = add(5);
add5(3); // 8
```

#### Partial Application
- Fixing some parameters
- Creating specialized versions
- Reusable configurations

#### Higher-Order Functions
- Accepting functions as arguments
- Returning functions
- Decorators
- Middleware pattern

---

### 9. **js-oop.js**
Object-Oriented Programming in JavaScript

**Concepts Covered:**

#### Objects
- Object literals
- Constructor functions
- Object methods
- Computed properties
- Property descriptors

#### Inheritance
- Prototype chain
- Prototype delegation
- Constructor inheritance
- `.constructor` property
- `instanceof` operator

#### Encapsulation
- Private properties (conventions)
- WeakMap for private data
- Symbols for privacy
- Getters and setters
- Object.defineProperty()

#### Polymorphism
- Method overriding
- Dynamic binding
- Duck typing

#### ES6 Classes
- Class syntax
- Constructor method
- Instance methods
- Static methods
- Class inheritance
- Getters/setters in classes

#### Design Patterns
- Factory pattern
- Singleton pattern
- Observer pattern
- Strategy pattern
- Adapter pattern

---

### 10. **json-examples.js**
(Already covered above)

---

### 11. **modules-ex.js**
Module patterns and systems

**Topics Covered:**

#### CommonJS (Node.js)
```javascript
// Exporting
module.exports = { foo: 'bar' };

// Importing
const { foo } = require('./module.js');
```

#### ES Modules (ESM)
```javascript
// Exporting
export const foo = 'bar';
export default MyClass;

// Importing
import { foo } from './module.js';
import MyClass from './module.js';
```

#### Module Patterns
- Namespace pattern
- Revealing module pattern
- Immediately Invoked Function Expression (IIFE)
- Singleton modules

#### Circular Dependency
- Detection and resolution
- Lazy loading
- Restructuring modules

#### Code Splitting
- Dynamic imports
- Conditional loading
- Lazy loading patterns

---

### 12. **greeter.js**
Class-based example implementation

**Features Demonstrated:**
- Class definition
- Constructor method
- Instance methods
- Method usage
- Simple application example

---

### 13. **es6/generators.js**
Generator functions and iterators

**Key Concepts:**

#### Generator Functions
- `function*` syntax
- `yield` keyword
- Pausable execution
- Iterator protocol

```javascript
function* counterGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
const iter = counterGenerator();
iter.next(); // { value: 1, done: false }
```

#### Iterators
- `.next()` method
- `{ value, done }` object
- Iterator protocol
- Iterable protocol

#### Use Cases
- Lazy evaluation
- Infinite sequences
- State machine implementation
- Async-like operations

#### Generator Delegation
- `yield*` syntax
- Delegating to other generators
- Composing generators

---

### 14. **es6/symbols.js**
Symbol primitive type usage

**Key Concepts:**

#### Symbol Basics
- Unique identifiers
- `Symbol()` constructor
- `Symbol.for()` global registry
- `Symbol.keyFor()` description lookup

```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');
sym1 === sym2; // false - each is unique
```

#### Well-Known Symbols
- `Symbol.iterator` - Iteration protocol
- `Symbol.toPrimitive` - Type conversion
- `Symbol.toStringTag` - Object type
- `Symbol.hasInstance` - instanceof checks

#### Use Cases
- Private object properties
- Avoiding name collisions
- Metaclasses and reflection
- Iterator implementations

---

### 15. **index.js**
Entry point demonstrating JavaScript concepts

**Usage:**
```bash
npm start -- javascript/index.js
```

---

## 🎓 Learning Path

### Beginner
1. **js-basics.js** - Variables, operators, control flow, functions, scope
2. **array-ex.js** - Array methods and operations
3. **json-examples.js** - JSON handling

### Intermediate
1. **es6-features.js** - Modern ES6+ features
2. **advanced-js.js** - Closures, prototypes, `this`
3. **js-oop.js** - OOP patterns and ES6 classes
4. **async-javascript.js** - Promises and async/await

### Advanced
1. **clean-code.js** - Best practices
2. **composible-javascript.js** - Functional programming
3. **modules-ex.js** - Module systems
4. **es6/generators.js** - Generators
5. **es6/symbols.js** - Symbols

---

## 💻 Running Examples

```bash
# Run JavaScript demonstrations
npm start -- javascript/index.js

# Run specific concept file
npm start -- javascript/es6-features.js

# Run generator examples
npm start -- javascript/es6/generators.js

# Run symbol examples
npm start -- javascript/es6/symbols.js
```

---

## 📊 Concept Relationships

```
Basics
├── Variables & Types
├── Operators
├── Control Flow
└── Functions
    ├── Scope
    ├── Closures → Advanced JS
    └── Parameters
        
ES6+ Features
├── Let/Const
├── Arrow Functions
├── Classes
├── Destructuring
├── Template Literals
├── Spread/Rest
└── For...of

Async Patterns
├── Callbacks
├── Promises
└── Async/Await

Object-Oriented
├── Objects
├── Prototypes
├── Inheritance
├── Classes
└── Design Patterns

Functional
├── Pure Functions
├── Higher-Order Functions
├── Function Composition
├── Currying
└── Partial Application

Modules & Organization
├── CommonJS
├── ES Modules
├── Module Patterns
└── Code Splitting
```

---

## 🔍 Interview Tips

1. **Know the basics** - Scope, closures, `this`
2. **Understand async** - Promises, async/await, event loop
3. **Practice ES6** - Classes, destructuring, spread
4. **Functional mindset** - Map, filter, reduce, composition
5. **OOP patterns** - Inheritance, polymorphism, SOLID principles

---

## 📚 Further Resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [Modern JavaScript Tutorials](https://www.youtube.com/watch?v=aXOChLn5ZdQ)

---

**Last Updated:** January 2026
