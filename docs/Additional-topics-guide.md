# Additional Topics Directory Guide

## 📖 Overview

This guide covers the remaining directories in the javascript-samples project, including Promise/Async patterns, Functional programming, Testing, and other specialized topics.

---

## 📂 Directories

### 1. **promise-async/** - Async Programming Patterns

Directory containing 5 files for asynchronous JavaScript patterns.

#### **callback-promise.js**
Converting traditional callbacks to promises

**Topics:**
- Callback-based functions
- Promise wrapping
- Error handling conversion
- Promisification

```javascript
// Callback style
function readFile(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) callback(err);
    else callback(null, data);
  });
}

// Promise style
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

#### **promisify-sample.js**
Using Bluebird for automatic promisification

**Key Library:** Bluebird Promise library

**Methods:**
- `Promise.promisify()` - Convert single function
- `Promise.promisifyAll()` - Convert entire module

```javascript
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

#### **async-samples.js**
Async/await syntax examples

**Topics:**
- Function async syntax
- Await expressions
- Error handling with try/catch
- Sequential execution
- Concurrent execution

```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

#### **async-series.js**
Sequential vs parallel async execution

**Patterns:**

##### Sequential Execution
```javascript
// One after another
const result1 = await promise1;
const result2 = await promise2;
const result3 = await promise3;
// Total time: sum of all
```

##### Parallel Execution
```javascript
// All at once
const [result1, result2, result3] = await Promise.all([
  promise1, promise2, promise3
]);
// Total time: max of all
```

**Performance Implications:**
- Sequential: Slower but simpler
- Parallel: Faster when independent
- Mixed: Use appropriate pattern for situation

#### **event-promise.js**
Converting event emitters to promises

**Topics:**
- Event-based systems
- Promise wrapper for events
- Multiple event handling
- Timeout handling

```javascript
function eventToPromise(emitter, event) {
  return new Promise((resolve, reject) => {
    emitter.on(event, resolve);
    emitter.on('error', reject);
  });
}
```

---

### 2. **functional/** - Functional Programming

Directory containing functional programming concepts and practices.

#### **mastering-fp.js**
Functional programming patterns and principles

**Key Concepts:**

| Concept | Description |
|---------|-------------|
| Pure Functions | Same input → same output, no side effects |
| Immutability | Data never changes, create new values |
| First-class Functions | Functions as values, can be passed around |
| Higher-Order Functions | Functions taking/returning functions |
| Function Composition | Combining functions into pipelines |
| Currying | Converting multi-param to chained single-param |
| Partial Application | Pre-filling some parameters |
| Recursion | Function calling itself |

**Pure Functions:**
```javascript
// Pure
const add = (a, b) => a + b;

// Impure (modifies external state)
let total = 0;
const addToTotal = (n) => {
  total += n;  // Side effect!
  return total;
};
```

**Function Composition:**
```javascript
const compose = (f, g) => x => f(g(x));
const pipe = (f, g) => x => g(f(x));

const add5 = n => n + 5;
const multiply2 = n => n * 2;

// Compose (right to left)
const composed = compose(add5, multiply2);
composed(3); // (3 * 2) + 5 = 11

// Pipe (left to right)
const piped = pipe(multiply2, add5);
piped(3); // (3 * 2) + 5 = 11
```

**Currying:**
```javascript
// Multi-parameter to curried
const add = (a, b, c) => a + b + c;
const curriedAdd = a => b => c => a + b + c;

const add2 = curriedAdd(2);
const add2And3 = add2(3);
const result = add2And3(5); // 10
```

#### **mastering-fp.test.js**
Test cases for functional programming

**Testing Patterns:**
- Testing pure functions
- Testing function composition
- Testing higher-order functions
- Edge case validation

---

### 3. **testing/** - Testing Patterns

Directory containing testing with Jest framework.

#### **jest-mocking.test.js**
Jest mocking and spying

**Key Topics:**

##### Spies
```javascript
jest.fn() // Create spy function
jest.spyOn(obj, 'method') // Spy on method
```

##### Mocks
```javascript
jest.mock('./module') // Mock entire module
jest.mock('./module', () => ({
  // Mock implementation
}))
```

##### Assertions
```javascript
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(args)
expect(fn).toHaveBeenCalledTimes(n)
expect(result).toBe(expected)
expect(result).toEqual(expected)
```

#### **api/album-service.js**
Service with fetchable album data

**Functionality:**
- Fetch album data from API
- Data transformation
- Error handling

#### **api/album-service.test.js**
Unit tests for album service

**Test Patterns:**
- Mocking API calls
- Testing success cases
- Testing error cases
- Testing transformations

```javascript
test('fetches album data', async () => {
  const mockAlbum = { id: 1, title: 'Album' };
  jest.mock('../album-service', () => ({
    fetchAlbums: jest.fn().mockResolvedValue([mockAlbum])
  }));
  
  const result = await fetchAlbums();
  expect(result).toEqual([mockAlbum]);
});
```

#### **api/__mocks__/album-service.js**
Mock implementation for testing

**Mock Functions:**
- Predefined responses
- Error scenarios
- Async handling

#### **albums/recent-albums.js**
Get recent albums logic

**Functionality:**
- Filter recent albums
- Sorting logic
- Date comparisons

#### **albums/recent-albums.test.js**
Tests for recent albums

**Test Cases:**
- Filtering by date
- Sorting verification
- Edge cases (empty, old, future)

---

### 4. **express-server/** - Express.js Setup

Directory containing Express server setup.

**Topics Covered:**
- Express app creation
- Middleware setup
- Route handling
- Error handling
- Static file serving

```javascript
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.listen(3000);
```

---

### 5. **passport/** - Authentication

Directory containing Passport.js authentication setup.

**Topics:**
- Local strategy setup
- User authentication
- Session management
- Login/logout flow

**Key Concepts:**
- Passport middleware
- Strategies (local, OAuth, etc.)
- Serialization
- Session handling

```javascript
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.validPassword(password)) 
        return done(null, false);
      return done(null, user);
    });
  }
));
```

---

### 6. **lodash/** - Utility Library

Directory with Lodash examples

**Common Functions:**

| Function | Purpose |
|----------|---------|
| `_.map()` | Transform array |
| `_.filter()` | Select elements |
| `_.reduce()` | Aggregate values |
| `_.groupBy()` | Group by property |
| `_.sortBy()` | Sort by property |
| `_.uniq()` | Remove duplicates |
| `_.merge()` | Deep merge objects |
| `_.clone()` | Copy objects |
| `_.debounce()` | Delay function |
| `_.throttle()` | Limit function calls |

**Advantages over native:**
- Chainable API
- Consistent naming
- More functions
- Performance optimized

---

### 7. **refactoring/** - Code Refactoring

Directory containing refactoring patterns and techniques.

#### **Files:**
- **statement.js** - Original code to refactor
- **create-statement-data.js** - Extracted logic
- **create-statement-data.test.js** - Tests
- **index.js** - Refactored implementation

**Refactoring Techniques:**

1. **Extract Method**
   - Break long functions into smaller
   - Improve readability
   - Increase reusability

2. **Extract Variable**
   - Name complex expressions
   - Improve clarity
   - Enable reuse

3. **Extract Class**
   - Move related functionality
   - Better organization
   - Single Responsibility

4. **Test-Driven Refactoring**
   - Write tests first
   - Refactor with confidence
   - Maintain behavior

**Example Refactoring:**
```javascript
// Before
function printStatement(customer) {
  let result = "Statement for " + customer.name + "\n";
  // ... 50 lines of complex logic
  return result;
}

// After
function printStatement(customer) {
  return formatHeader(customer.name) + 
         formatEntries(customer.entries) +
         formatFooter(customer.total);
}
```

---

### 8. **replit-examples/** - Miscellaneous Examples

Collection of coding challenge solutions

**Categories:**

| File | Purpose |
|------|---------|
| advanced.js | Advanced problems |
| algos.js | Algorithm challenges |
| binary-search-tree.js | BST implementation |
| design-patterns.js | Design patterns |
| functional.js | FP challenges |
| leet-code.js | LeetCode problems |
| linked-list.js | Linked list exercises |
| min-heap.js | Heap implementation |
| promises.js | Promise challenges |

**Purpose:**
- Practice coding problems
- Reinforce concepts
- Interview preparation
- Algorithm implementation

---

### 9. **task-list-manager/** - Example Application

Full stack task management application

#### **Files:**
- **server.js** - Backend server
- **client.js** - Frontend client
- **README.md** - Documentation

**Features:**
- Task CRUD operations
- Client-server communication
- Simple UI
- Data persistence

**Technology Stack:**
- Node.js backend
- Express or vanilla HTTP
- Frontend DOM manipulation
- File or database storage

---

## 📊 Topic Relationship Map

```
Asynchronous Programming
├── Callbacks → Promises
├── Promise Patterns
├── Async/Await
└── Event Handling

Functional Programming
├── Pure Functions
├── Function Composition
├── Currying & Partial Application
├── Higher-Order Functions
└── Immutability

Testing
├── Unit Testing
├── Mocking & Spying
├── Test Coverage
├── Integration Tests
└── TDD

Real-World Applications
├── Express Servers
├── Authentication (Passport)
├── Task Management
└── Utilities (Lodash)

Code Quality
├── Refactoring Techniques
├── Clean Code
├── Testing
└── Best Practices
```

---

## 🎓 Learning Path by Level

### Beginner
1. promise-async/callback-promise.js
2. promise-async/async-samples.js
3. functional/mastering-fp.js
4. testing/jest-mocking.test.js

### Intermediate
1. promise-async/async-series.js
2. functional composition patterns
3. express-server setup
4. Lodash utilities

### Advanced
1. refactoring techniques
2. Design patterns
3. passport authentication
4. Complex test scenarios

---

## 💻 Running Examples

```bash
# Test examples
npm test

# Run testing demonstrations
npm test testing/jest-mocking.test.js

# Run refactoring examples
npm start -- refactoring/index.js

# Run functional programming
npm start -- functional/index.js
```

---

## 🔍 Interview Focus

### Promise/Async
- Event loop understanding
- Promise states and transitions
- Async/await syntax
- Error handling patterns

### Functional Programming
- Pure functions importance
- Function composition
- Higher-order functions
- Immutability concepts

### Testing
- Unit vs integration
- Mocking and spying
- Test coverage
- TDD approach

---

## 📚 Further Resources

- [Jest Documentation](https://jestjs.io/)
- [Passport.js Guide](http://www.passportjs.org/)
- [Lodash Documentation](https://lodash.com/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Refactoring Guru](https://refactoring.guru/)

---

**Last Updated:** January 2026
