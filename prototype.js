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

Animal.prototype.eat = function (amount) {
  console.log(this.name, 'eats', amout, 'quantity of food');
}

Animal.prototype.sleep = function (length) {
  console.log(this.name, 'sleeps for', length, 'hours');
}

// Instantiate using constructor function
// let leo = Animal('Leo', 20);

// Instantiate using new operator, it adds prototype by default, no need to use Object.create()
let leo = new Animal('Leo', 20);

// Though Animal object has no sleep method, it gets it from its prototype
leo.sleep(10);

for (let key in leo) {
  if (leo.hasOwnProperty(key)) { // Checks only properties belong to leo object
    console.log(`key: ${key}, value: ${leo[key]}`);
  }
}