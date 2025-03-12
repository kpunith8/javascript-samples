const hello = (delay) => console.log(`Hello after ${delay} seconds`);

// third parameter passed as param to hello function
// setTimeout(hello, 1000, 1);

// setTimeout(hello, 2 * 1000, 2);

console.log(`Current user is: ${process.env.USERNAME}`);

// console.log('echo the string using process.stdin and stdout');

// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(chunk);
//   }
// });

// Above function can also be written as follows,
// process.stdin.pipe(process.stdout);

import { Transform } from "stream";

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

// It waits for user input and converts it to uppercase
// process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

// Custom event emitter implementation
class EventEmitter {
  constructor() {
    this.events = {}; // Store event listeners
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []; // Create an array for the event if it doesn't exist
    }
    this.events[event].push(listener); // Add the listener to the event array
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args)); // Call each listener with the provided arguments
    }
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener); // Remove a specific listener
    }
  }

  once(event, listener) {
    const wrappedListener = (...args) => {
      listener(...args);
      this.off(event, wrappedListener); // Remove after the first execution
    };
    this.on(event, wrappedListener);
  }
}

// Example usage:
const myEmitter = new EventEmitter();

// Add event listeners
myEmitter.on("myEvent", (data) => console.log("Listener 1:", data));
myEmitter.on("myEvent", (data) => console.log("Listener 2:", data));

// Emit the event
myEmitter.emit("myEvent", "Hello from the event!");

myEmitter.once("onceEvent", (data) => console.log("once listener:", data));
myEmitter.emit("onceEvent", "event triggered once!");
myEmitter.emit("onceEvent", "This event will not be triggered");

// Remove a listener
const listenerToRemove = (data) => console.log("Listener to remove:", data);

myEmitter.on("removeEvent", listenerToRemove);
myEmitter.emit("removeEvent", "This will be logged");
myEmitter.off("removeEvent", listenerToRemove);
myEmitter.emit("removeEvent", "This will not be logged");
