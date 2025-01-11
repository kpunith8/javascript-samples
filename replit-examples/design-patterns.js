// Mediator patten
function Member(name) {
  this.name = name;
  this.chatroom = null;
}

Member.prototype = {
  send: function (message, toMember) {
    this.chatroom.send(message, this, toMember);
  },
  receive: function (message, fromMember) {
    console.log(`${fromMember.name} to ${this.name}: ${message}`);
  },
};

// Mediator object, which handles the messages
function Chatroom() {
  this.members = {};
}

Chatroom.prototype = {
  addMember: function (member) {
    this.members[member.name] = member;
    member.chatroom = this;
  },
  send: function (message, fromMember, toMember) {
    toMember.receive(message, fromMember);
  },
};

const john = new Member("John");
const bob = new Member("Bob");
const jane = new Member("Jane");

const chatroom1 = new Chatroom();
chatroom1.addMember(john);
chatroom1.addMember(bob);
chatroom1.addMember(jane);

console.log("Mediator Pattern:");
bob.send("Hello Jane!!", jane);

// Proxy Pattern: Proxy takes care of returning the value from the API, instead of directly talking to the object itself, delegate to proxy.

function CryptoAPI() {
  this.getValue = function (coin) {
    console.log("Calling external API...");
    switch (coin) {
      case "BTC":
        return 40000;
      case "LTC":
        return 2000;
    }
  };
}

function CryptoProxy() {
  this.api = new CryptoAPI();
  // Store the result in cache and return if already present otherwise make the call to API and return the data
  this.cache = {};

  this.getValue = function (coin) {
    if (!this.cache[coin]) {
      this.cache[coin] = this.api.getValue(coin);
    }

    return this.cache[coin];
  };
}

console.log("\nProxy Pattern:");
const cryptoPrice = new CryptoProxy();
console.log(cryptoPrice.getValue("LTC"));
console.log(cryptoPrice.getValue("BTC"));
console.log(cryptoPrice.getValue("BTC"));
console.log(cryptoPrice.getValue("LTC"));
console.log(cryptoPrice.getValue("BTC"));

// Observer Pattern: All the subscribers subscribed to a subject will be notified when some changes happend
function Subject() {
  this.observers = [];
}

Subject.prototype = {
  subscribe: function (fn) {
    this.observers.push(fn);
  },
  unsubscribe: function (fnToRemove) {
    this.observers = this.observers.filter((fn) => fn !== fnToRemove);
  },
  notify: function () {
    this.observers.forEach((fn) => fn.call());
  },
};

console.log("\nObserver Pattern:");
const subject = new Subject();
const observer1 = () => {
  console.log("observer1 is being notified");
};
const observer2 = () => {
  console.log("observer2 is being notified");
};

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.unsubscribe(observer1);

subject.notify();

// Visitor Pattern: Add or provide new operations to an object without changing the object
// Useful when extending the library with additional features
function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
}

Employee.prototype = {
  getSalary: function () {
    return this.salary;
  },
  setSalary: function (newSalary) {
    this.salary = newSalary;
  },
  accept: function (visitorFn) {
    visitorFn(this);
  },
};

console.log("\nVisitor Pattern:");
const emp = new Employee("Punith K", 100);
console.log("Initial Salary:", emp.getSalary());

// Visitor function to double the salary
const doubleSalary = (emp) => {
  emp.setSalary(emp.getSalary() * 2);
};

emp.accept(doubleSalary);

console.log("Doubled salary:", emp.getSalary());
