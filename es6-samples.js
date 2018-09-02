// Arrow funtions

const arrowFunction = (price, tax) => {
  let tax1 = price * tax;

  return tax1 + price;
}

// // Default params
// const calculateTax = (price, tax = 0.20, term = 1) => price * tax * term;

// //const calcInterest = (amount, term, interest = 0.5 * amount * term) => console.log('Total:', interest + amount);

// console.log('Tax:', calculateTax(25, undefined, 2));

//calcInterest(2000, 2);

//console.log(arrowFunction(300, 0.28));

// // Rest operator - rest operators always goes to end after the params are declared
// const restParams = (name, ...params) => {
//   return name + " " + params.map(value => {
//     return value;
//   });
// };

// console.log(restParams('Punith', 'K', 'SSE', 30));

// function sum(x, y, z) {
//   return x + y + z;
// }

const numbers = [1, 2, 3, 4];

// console.log('Sum:', sum(...arr));

// //Object Destructuring
// const name = {
//   fName: "Punith", lName: "K", age1: 30, education: {
//     degree: 'Masters',
//     specification: "CSE"
//   }
// };


// const { fName, lName, age1 } = name;

// const { education: { degree, specification } } = name;

// // assigning to a variable
// const { fName: firstName, lName: lastName, age1: age } = name;

// console.log('Object destructuring, named variabes:', firstName, lastName, age);

// console.log('Object destructuring: ', fName, lName, age);

// console.log('Nested object destructuring: ', degree, specification);

// // Array destructuring
// var [a, c] = numbers;

// console.log('Array destructuring:', a, c);

// Template Literals

const Name = "Punith";
const LName = "K";

console.log(`Name is: ${Name} and ${LName}`);

// Multi line without using \n
console.log(`Hi there

check this out
`);

console.log("about" + "\n" +
  "me");
