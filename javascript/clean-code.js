// SOLID Principles

// Single Responsibility Principle:
// There should never be more than one reason for a class to change.

// Open/Closed Principle:
// Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.
// This principle basically states that you should allow users to add new functionalities without changing existing code.

// Liskov Substitution Principle:
// If S is a subtype of T, then objects of type T may be replaced with objects of type S
// (i.e., objects of type S may substitute objects of type T) without altering any of the desirable properties of that program

// Interface Segregation Principle:
// Clients should not be forced to depend upon interfaces that they do not use.

// Dependency Inversion Principle:
// High-level modules should not depend on low-level modules. Both should depend on abstractions.
// Abstractions should not depend upon details. Details should depend on abstractions.

// Bad example
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryTrackerB {
  constructor(items) {
    this.items = items;

    // BAD: We have created a dependency on a specific request implementation.
    // We should just have requestItems depend on a request method: `request`
    this.requester = new InventoryRequesterB();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

// Good
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ["WS"];
  }

  requestItem(item) {
    // ...
  }
}

// By constructing our dependencies externally and injecting them, we can easily
// substitute our request module for a fancy new one that uses WebSockets.
const inventoryTracker = new InventoryTracker(
  ["apples", "bananas"],
  new InventoryRequesterV2()
);
inventoryTracker.requestItems();

const inventoryTracker1 = new InventoryTracker(["apples", "bananas"]);
inventoryTracker1.requestItems();
