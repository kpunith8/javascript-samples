// Prototype is a 'property on a function' that represents an object

// Constructor function
// function Animal(name, energy) {
//   let animal = Object.create(Animal.prototype);
//   animal.name = name;
//   animal.energy = energy;

//   return animal;
// }

// It can also created without returing an object from the function and assign prototype explicitly
// function Animal(name, energy) {
//   this.name = name;
//   this.energy = energy;
// }

// Construting using arrow functions leads to an error, since it has no reference to 'this', and Arrow functions don't have prototype object

// Can also be created using Class
class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }

  // eat(amount) {
  //   console.log(this.name, 'eats', amout, 'quantity of food');
  // }

  // sleep(length) {
  //   console.log(this.name, 'sleeps for', length, 'hours');
  // }
}

Animal.prototype.eat = function(amount) {
  console.log(this.name, "eats", amout, "quantity of food");
};

Animal.prototype.sleep = function(length) {
  console.log(this.name, "sleeps for", length, "hours");
};

// Instantiate using constructor function
// let leo = Animal('Leo', 20);

// Instantiate using new operator, it adds prototype by default, no need to use Object.create()
let leo = new Animal("Leo", 20);

// Though Animal object has no sleep method, it gets it from its prototype
leo.sleep(10);

for (let key in leo) {
  if (leo.hasOwnProperty(key)) {
    // Checks only properties belong to leo object
    console.log(`key: ${key}, value: ${leo[key]}`);
  }
}

// Prototypal inheritance - Udemy Course
let dragon = {
  name: "Dragon",
  fire: true,
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I'm ${this.name} breather of fire`;
    }
    return `I'm ${this.name} I don't know how to sing`;
  }
};

let lizard = {
  name: "Lizard",
  fight() {
    return 1;
  }
};

// Get the properties of dragon to lizard through prototypal inheritance
// Can easily access all the properties of dragon
// This is not the right way to assign prototypes to other objects
lizard.__proto__ = dragon;

// Change the property of lizard, it doesn't affect dragon object
lizard.fire = false;
console.log(`Lizard inheriting dragon's sing(): ${lizard.sing()}`);

console.log(`Dragons sing(): ${dragon.sing()}`);

// Prototypes with Object.create()
let human = {
  isMortal: true
};

let ganguly = Object.create(human);

console.log(
  "Prototypes with Object.create():",
  ganguly,
  "- is mortal:",
  ganguly.isMortal,
  "- human is prototype of ganguly:",
  human.isPrototypeOf(ganguly)
);

// only functions have the prototype property, not the primitives

// OOP

// Factory functions
function createElf(name, weapon) {
  return {
    name,
    weapon,
    attack() {
      return `${name} attacks with ${weapon}`;
    }
  };
}

const peter = createElf("Peter", "Bow");
const mara = createElf("Mara", "Sword");

console.log("Objects created with factory fn:", peter.attack(), mara.attack());

// Here we can extract attack() function and reduce repetation
const elfFunctions = {
  attack() {
    return `${this.name} attacks with ${this.weapon}`;
  }
};

function createElf1(name, weapon) {
  let newElf = Object.create(elfFunctions);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const peter1 = createElf1("Peter-1", "Bow");

console.log("Reuse functions with Object.create():", peter1.attack());

// constructor functions
// To identify use uppercase letter instead of camel case we use for
// normal functions, so that it is easy that we know its a constructor function
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

// Add methods to elf with prototypal inheritance
Elf.prototype.attack = function() {
  return `${this.name} attacks with ${this.weapon}`;
}
// Initialize with 'new' keyword,
// which does Object.create() internally
const peter2 = new Elf("Peter-2", "Fire");

// peter2.__proto__ === Elf.prototype
// peter.prototype returns 'undefined' because it is not a function

console.log(
  `Constructor functions: ${peter2.attack()}`
);

// OOP with ES6 classes
class Elf1 {
  constructor(name, weapon) {
    this.name = name;
    this.weapom = weapon;
  }

  attack() {
    return `${this.name} attacks with ${this.weapom}`;
  }
}

const peter3 = new Elf1('Peter-4', 'Air');

console.log(`OOP with classes: ${peter3.attack()}`);
// use instanceof to find the instance of the object it belongs to

