# Javascript Samples - Project Overview

## 📋 Project Description

**javascript-samples** is a comprehensive educational repository containing JavaScript samples covering basic to advanced concepts. This project serves as a learning resource for JavaScript developers at all skill levels, from fundamentals to advanced patterns and best practices.

### Project Metadata
- **Version:** 1.0.0
- **License:** ISC
- **Repository:** https://github.com/kpunith8/javascript-samples
- **Type:** ES Modules (Node.js)

---

## 🗂️ Project Structure

```
javascript-samples/
├── algorithms/              # Algorithm implementations and patterns
├── data-structure/          # Data structure implementations
├── javascript/              # Core JavaScript concepts
├── node-examples/           # Node.js specific features and patterns
├── promise-async/           # Promise and async/await patterns
├── functional/              # Functional programming concepts
├── testing/                 # Testing patterns and practices
├── express-server/          # Express.js server setup
├── passport/                # Passport.js authentication
├── lodash/                  # Lodash utility library examples
├── refactoring/             # Code refactoring patterns
├── replit-examples/         # Miscellaneous examples
└── task-list-manager/       # Task management example app
```

---

## 📚 Directory Details

### 1. **algorithms/** - Algorithm Implementations

Learn and implement various algorithms in JavaScript:

| File | Purpose |
|------|---------|
| `binary-search.js` | Binary search algorithm implementation |
| `dynamic-prog.js` | Dynamic programming solutions |
| `general-algos.js` | General algorithm utilities and helpers |
| `general-algos.test.js` | Test cases for general algorithms |
| `interview-algos.js` | Interview-focused algorithm problems |
| `lru-cache.js` | Least Recently Used cache implementation |
| `recursive-algos.js` | Recursive algorithm patterns |
| `sliding-window.js` | Sliding window technique |
| `slow-fast-pointer.js` | Two-pointer techniques |
| `sorting-algos.js` | Various sorting algorithms |
| `structy-algos.js` | Structy.net algorithm challenges |
| `two-pointers.js` | Two-pointer algorithm patterns |
| `index.js` | Entry point with algorithm demonstrations |

**Key Topics:**
- Array manipulation (chunking, diffing)
- Parentheses/bracket validation
- Recurring number detection
- Sorting techniques
- Search algorithms
- Pointer techniques

---

### 2. **data-structure/** - Data Structure Implementations

Fundamental data structures implemented from scratch:

| File | Purpose |
|------|---------|
| `hash-table.js` | Hash table with collision handling |
| `linked-list.js` | Singly & doubly linked lists, stacks, queues |
| `trees.js` | Binary search trees and tree traversal |
| `dfs-tree.js` | Depth-first search implementations |
| `graph.js` | Graph data structure and algorithms |
| `min-heap.js` | Min-heap implementation |
| `array-queue.js` | Queue implementation using arrays |
| `async-queue.js` | Asynchronous queue handling |
| `queue-user-defined.js` | Custom queue implementation |
| `set-user-defined.js` | Custom set implementation |
| `index.js` | Demonstrations and usage examples |

**Key Concepts:**
- Hash collisions and resolution
- Linked list operations (insert, delete, traverse)
- Tree operations and traversal methods
- Graph representations and algorithms
- Queue and Stack operations
- Heap operations

---

### 3. **javascript/** - Core JavaScript Concepts

Essential and advanced JavaScript language features:

| File | Purpose |
|------|---------|
| `js-basics.js` | Fundamental JavaScript concepts |
| `advanced-js.js` | Advanced JavaScript patterns |
| `es6-features.js` | ES6+ features and syntax |
| `async-javascript.js` | Asynchronous JavaScript patterns |
| `array-ex.js` | Array methods and operations |
| `json-examples.js` | JSON parsing and manipulation |
| `clean-code.js` | Clean code principles in JavaScript |
| `composible-javascript.js` | Function composition patterns |
| `js-oop.js` | Object-oriented programming in JS |
| `modules-ex.js` | Module patterns and best practices |
| `greeter.js` | Class-based example |
| `es6/generators.js` | Generator functions and iterators |
| `es6/symbols.js` | Symbol primitive type usage |
| `index.js` | Module demonstrations |

**Key Topics:**
- Closures, scope, and context (this)
- Prototypal inheritance
- ES6 classes and modern syntax
- Async/await and promises
- Array manipulation methods
- Function composition
- Module systems
- Generators and iterators
- Symbols

---

### 4. **node-examples/** - Node.js Features & Patterns

Node.js specific functionality and server-side patterns:

| File/Directory | Purpose |
|---|---|
| `http-server.js` | Basic HTTP server setup |
| `event-emitter.js` | EventEmitter patterns |
| `file-streams.js` | File streaming operations |
| `read-stream.js` | Reading files with streams |
| `child-process.js` | Child process management |
| `fork-ex/` | Process forking examples |
| `cluster/` | Clustering for multi-core usage |
| `streams/` | Stream processing and piping |
| `streams/client-server/` | Client-server streaming |
| `create-files.js` | File creation utilities |
| `delete-older-files.js` | File deletion and cleanup |
| `watch-directory.js` | Directory watching for changes |
| `file-zip.js` | File compression |
| `json-server.js` | JSON server setup |
| `compute.js` | Computation examples |
| `config.json` | Configuration file |
| `index.js` | Module demonstrations |

**Key Concepts:**
- HTTP servers and routing
- Stream handling and piping
- File system operations
- Child processes and forking
- Cluster module for parallel processing
- Event-driven architecture
- Directory watching and file operations

---

### 5. **promise-async/** - Async Programming

Asynchronous patterns and promise-related concepts:

| File | Purpose |
|------|---------|
| `callback-promise.js` | Converting callbacks to promises |
| `promisify-sample.js` | Promisifying functions |
| `async-samples.js` | Async/await examples |
| `async-series.js` | Series vs parallel execution |
| `event-promise.js` | Events as promises |

**Key Concepts:**
- Promise creation and handling
- Callback to promise conversion
- Promisification with Bluebird
- Async/await syntax
- Series and parallel execution
- Error handling in async code

---

### 6. **functional/** - Functional Programming

Functional programming paradigms and techniques:

| File | Purpose |
|------|---------|
| `mastering-fp.js` | Functional programming concepts |
| `mastering-fp.test.js` | Functional programming tests |
| `index.js` | Examples and demonstrations |

**Key Topics:**
- Pure functions
- First-class functions
- Higher-order functions
- Function composition
- Immutability patterns

---

### 7. **testing/** - Testing Practices

Testing patterns and Jest framework usage:

| Directory/File | Purpose |
|---|---|
| `jest-mocking.test.js` | Jest mocking and spy examples |
| `api/album-service.js` | Service to be tested |
| `api/album-service.test.js` | Unit tests for service |
| `api/__mocks__/album-service.js` | Mock implementation |
| `albums/recent-albums.js` | Album fetching logic |
| `albums/recent-albums.test.js` | Tests for album logic |

**Key Topics:**
- Jest testing framework
- Unit testing
- Mocking and spying
- Test assertions
- Service testing patterns

---

### 8. **Other Directories**

#### **express-server/** - Express.js Setup
- Basic Express server configuration
- Request handling patterns

#### **passport/** - Authentication
- Authentication setup examples
- Local strategy implementation

#### **lodash/** - Utility Library
- Lodash utility function demonstrations

#### **refactoring/** - Code Refactoring
- Refactoring patterns and techniques
- Before/after code examples
- Test-driven refactoring

#### **replit-examples/** - Miscellaneous Examples
- Algorithm challenges from replit
- Various coding challenges
- Pattern implementations

#### **task-list-manager/** - Example Application
- Client-server task management app
- Practical application example

---

## 🔧 Technologies & Dependencies

### Core Dependencies

```json
{
  "async": "^3.2.4",           // Async utilities
  "axios": "^1.4.0",           // HTTP client
  "bluebird": "^3.7.2",        // Promise library
  "body-parser": "^1.20.2",    // Request parsing
  "express": "^4.18.2",        // Web framework
  "lodash": "^4.17.21",        // Utility library
  "passport": "^0.6.0",        // Authentication
  "ramda": "^0.29.0",          // Functional library
  "moment": "^2.30.1"          // Date manipulation
}
```

### Dev Dependencies

```json
{
  "@babel/cli": "^7.22.5",              // Babel CLI
  "@babel/core": "^7.22.5",             // Babel transpiler
  "@babel/preset-env": "^7.22.5",       // Modern JS support
  "jest": "^29.5.0",                    // Testing framework
  "mocha": "^10.2.0",                   // Alternative test runner
  "nodemon": "^3.0.1"                   // Auto-restart on changes
}
```

---

## 🚀 Scripts & Commands

### Available npm Scripts

```bash
# Start with nodemon and ESM support
npm start <file-path>
# Example: npm start -- algorithms/dynamic-prog.js

# Run tests with Jest
npm test

# Run tests with Mocha in watch mode
npm run test:mocha
```

### Running Individual Files

```bash
# Using npm start
npm start -- algorithms/binary-search.js

# Direct Node execution
node -r esm algorithms/binary-search.js

# With nodemon
nodemon -r esm algorithms/binary-search.js
```

---

## ⚙️ Configuration Files

### Babel Configuration (`babel.config.js`)
- Configured with @babel/preset-env for modern JavaScript support
- Enables transpilation of ES6+ features

### Jest Configuration (`jest.config.js`)
- Test environment setup
- Test discovery patterns
- Coverage reporting configuration

### .editorconfig
- Editor consistency settings
- Indentation and formatting rules

### VS Code Configuration (`.vscode/launch.json`)
- Debug configurations for VS Code
- Breakpoint and debug settings

---

## 📖 Key Learning Areas

### 1. **Data Structures & Algorithms**
- Classic algorithm implementations
- Data structure design from scratch
- Time and space complexity analysis
- Interview preparation

### 2. **JavaScript Fundamentals**
- Closures and scope
- Prototypal inheritance
- Async programming patterns
- ES6+ features

### 3. **Node.js Patterns**
- Stream processing
- File system operations
- Process management
- Event-driven architecture

### 4. **Functional Programming**
- Pure functions
- Function composition
- Immutability
- Higher-order functions

### 5. **Testing & Quality**
- Unit testing with Jest
- Mocking and spying
- Test-driven development
- Code refactoring

---

## 💡 How to Use This Project

### For Learning
1. Pick a topic from the directories above
2. Read the corresponding files to understand concepts
3. Run examples: `npm start -- <file-path>`
4. Modify and experiment with the code

### For Interview Preparation
1. Focus on `algorithms/` and `data-structure/` directories
2. Work through `replit-examples/` for coding challenges
3. Practice until you can implement without references

### For Reference
- Use specific files as implementation templates
- Check `index.js` files in each directory for usage examples
- Review test files for expected behavior

### For Testing
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- algorithms/general-algos.test.js
```

---

## 📝 Notes

### Using ES Modules
This project uses ES Modules. To run files:
- Use `npm start -- <file-path>`
- Or use `node -r esm <file-path>`
- Requires `"type": "module"` in package.json

### Debugging
- Open in VS Code and use the debug configuration
- Set breakpoints in files
- Use the launch configuration from `.vscode/launch.json`

### Contributing/Extending
- Add new algorithm implementations to `algorithms/`
- Add new data structures to `data-structure/`
- Include test files for all implementations
- Update this documentation with new sections

---

## 🔗 Related Resources

- [JavaScript MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Express.js Guide](https://expressjs.com/)
- [Ramda.js Documentation](https://ramdajs.com/)

---

## 📄 License

ISC License - See LICENSE file for details

---

## 📮 Contact

For questions or suggestions, please open an issue on the [GitHub repository](https://github.com/kpunith8/javascript-samples/issues)

---


