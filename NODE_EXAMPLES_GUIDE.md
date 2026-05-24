# Node.js Examples Directory Guide

## 📖 Overview

The `node-examples/` directory showcases Node.js-specific features, patterns, and best practices. This includes file operations, streams, processes, clustering, event handling, and server setup. These examples are essential for backend JavaScript development.

---

## 📂 Files and Directories Breakdown

### 1. **http-server.js**
Basic HTTP server setup and configuration

**Key Topics:**
- `http` module basics
- Creating server with `createServer()`
- Request and response objects
- Routing HTTP requests
- Setting response headers
- Sending responses

**Example:**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(3000, '127.0.0.1');
```

**Methods:**
- `req.method` - HTTP method (GET, POST, etc.)
- `req.url` - Request URL
- `req.headers` - Request headers
- `res.statusCode` - HTTP status
- `res.setHeader()` - Set response header
- `res.write()` - Write data
- `res.end()` - End response

**Use Cases:**
- Building HTTP servers
- API endpoints
- Static file serving
- Custom request handling

---

### 2. **event-emitter.js**
Event emitter patterns and EventEmitter class

**Key Concepts:**

#### EventEmitter Pattern
- Register event listeners with `.on()`
- Emit events with `.emit()`
- One-time listeners with `.once()`
- Remove listeners with `.off()` or `.removeListener()`

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', (data) => {
  console.log('Event fired:', data);
});

emitter.emit('event', 'some data');
```

#### Built-in Methods
- `.on(event, listener)` - Register listener
- `.once(event, listener)` - Single event
- `.off(event, listener)` - Remove listener
- `.emit(event, ...args)` - Fire event
- `.listeners(event)` - Get listeners
- `.removeAllListeners()` - Clear all

#### Use Cases
- Custom event systems
- Observer pattern
- Server event handling
- Decoupling components

---

### 3. **file-streams.js**
File streaming operations

**Key Concepts:**

#### Readable Streams
- Read large files in chunks
- `createReadStream()` method
- Pausing and resuming
- Drain event for backpressure

#### Writable Streams
- Write large data to files
- `createWriteStream()` method
- Drain event handling
- Error handling

#### Piping
- Automatic flow control
- Connect readable to writable
- Backpressure management

```javascript
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));
```

#### Events
- `data` - Chunk received
- `end` - All data read
- `error` - Error occurred
- `drain` - Can write again
- `close` - Stream closed

**Advantages:**
- Memory efficient
- Process files larger than RAM
- Automatic backpressure handling
- Faster than buffering entire file

---

### 4. **read-stream.js**
Reading files with streams

**Topics:**
- Creating read streams
- Chunk handling
- Encoding options
- Stream events
- Error handling
- End-of-file detection

**Common Patterns:**
```javascript
const stream = fs.createReadStream('file.txt');

stream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
});

stream.on('end', () => {
  console.log('File read complete');
});

stream.on('error', (err) => {
  console.error('Stream error:', err);
});
```

---

### 5. **child-process.js**
Child process management

**Key Methods:**

#### spawn()
- Start new process
- Stream-based communication
- For long-running processes

```javascript
const { spawn } = require('child_process');
const child = spawn('ls', ['-la']);

child.stdout.on('data', (data) => {
  console.log('stdout:', data);
});
```

#### exec()
- Execute shell command
- Buffer entire output
- Good for simple commands

```javascript
const { exec } = require('child_process');
exec('ls -la', (error, stdout, stderr) => {
  if (error) console.error(error);
  console.log(stdout);
});
```

#### execFile()
- Execute file directly
- More secure than exec
- No shell interpretation

#### fork()
- Spawn Node.js process
- IPC communication
- Clustering support

**Use Cases:**
- Running system commands
- Parallelizing CPU tasks
- Running long-duration jobs
- Process isolation

---

### 6. **fork-ex/ Directory**
Process forking examples

#### Files:
- **parent.js** - Parent process
- **child.js** - Child process

**Key Concepts:**
- `fork()` creates new Node process
- `.send()` and `.on('message')` for IPC
- Parent-child communication
- Process lifecycle

**Use Case:**
- Offload CPU-intensive work
- Run untrusted code safely
- Parallel processing

---

### 7. **cluster/ Directory**
Clustering for multi-core systems

#### Files:
- **cluster.js** - Cluster setup
- **server.js** - Server for clustering

**Key Concepts:**

#### Master Process
- Create workers
- Handle worker crashes
- Load distribution
- Graceful shutdown

#### Worker Processes
- Handle requests
- Auto-restart on crash
- Share port with master

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log('Worker died, respawning...');
    cluster.fork();
  });
} else {
  // Worker code
  require('./server.js');
}
```

**Benefits:**
- Utilizes all CPU cores
- Better performance on multi-core
- Request load distribution
- Worker crash recovery

---

### 8. **streams/ Directory**
Advanced stream processing

#### Files:
- **basic.js** - Stream fundamentals
- **client-server/** - Network streaming

**Topics:**
- Transform streams
- Duplex streams
- Piping chains
- Error handling
- Backpressure management

**Transform Stream Example:**
```javascript
const { Transform } = require('stream');

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs.createReadStream('input.txt')
  .pipe(uppercase)
  .pipe(fs.createWriteStream('output.txt'));
```

---

### 9. **create-files.js**
File creation utilities

**Topics:**
- Creating files programmatically
- Writing initial content
- Directory creation
- File permissions
- Batch file creation

---

### 10. **delete-older-files.js**
File cleanup and deletion

**Topics:**
- Reading directory contents
- File stats and timestamps
- Filtering old files
- Deleting files
- Error handling

**Use Cases:**
- Log file cleanup
- Temporary file removal
- Cache cleanup
- Maintenance tasks

---

### 11. **watch-directory.js**
Directory watching for changes

**Key Features:**
- Detect file changes
- `fs.watch()` or `fs.watchFile()`
- Event handling
- Recursive watching

```javascript
fs.watch('./directory', (eventType, filename) => {
  console.log(`${filename} - ${eventType}`);
});
```

**Use Cases:**
- Dev server auto-reload
- File sync systems
- Log monitoring
- Config file watching

---

### 12. **file-zip.js**
File compression operations

**Topics:**
- Zipping files
- Compression libraries (zlib)
- Streaming compression
- Error handling

```javascript
const zlib = require('zlib');
const fs = require('fs');

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

---

### 13. **json-server.js**
JSON API server setup

**Topics:**
- JSON request handling
- Request parsing
- Response formatting
- Content-type headers
- API endpoints

---

### 14. **compute.js**
Computation examples

**Topics:**
- CPU-intensive operations
- Blocking operations
- Performance considerations
- Worker threads for heavy computation

---

### 15. **config.json**
Configuration file example

**Purpose:**
- Server configuration
- Port and host settings
- Database connections
- Environment variables

**Structure:**
```json
{
  "port": 3000,
  "host": "localhost",
  "environment": "development"
}
```

---

### 16. **index.js**
Entry point with demonstrations

**Usage:**
```bash
npm start -- node-examples/index.js
```

---

## 📊 Node.js Module Comparison

| Module | Purpose | Use Cases |
|--------|---------|-----------|
| fs | File system | Reading/writing files |
| http | HTTP server | Web servers |
| stream | Data streaming | Large file processing |
| events | Event system | Observer pattern |
| child_process | Process spawning | Running commands |
| cluster | Multi-core | Server scaling |
| path | Path utilities | File path operations |
| url | URL parsing | URI handling |
| os | OS information | System info |
| util | Utilities | Helper functions |

---

## 🎓 Learning Path

### Beginner
1. **http-server.js** - Basic server
2. **file-streams.js** - File handling
3. **event-emitter.js** - Event patterns

### Intermediate
1. **read-stream.js** - Stream basics
2. **child-process.js** - Process spawning
3. **watch-directory.js** - File watching
4. **fork-ex/** - Process communication

### Advanced
1. **cluster/** - Multi-core clustering
2. **streams/** - Advanced streaming
3. Performance optimization
4. Error handling patterns

---

## 🔍 Common Patterns

### Stream Pattern
```javascript
source
  .pipe(transform1)
  .pipe(transform2)
  .pipe(destination)
  .on('error', handleError);
```

### Child Process Pattern
```javascript
const child = spawn('command', ['args']);
child.stdout.on('data', handleData);
child.on('close', handleClose);
```

### Event Emitter Pattern
```javascript
emitter.on('event', handler);
emitter.emit('event', data);
emitter.once('event', oneTimeHandler);
```

---

## 📚 Further Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Stream Handbook](https://substack.net/stream-handbook)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Node.js Design Patterns](https://www.nodejsdesignpatterns.com/)

---

**Last Updated:** January 2026
