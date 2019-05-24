let jsonObject = {
  'name': {
    'firstName': 'Frank',
    'lastName': 'Joe'
  },
  'dob': '1990-12-12',
  'hasGraduated': true,
  'grades': [
    {
      'subject': 'DBMS',
      'grade': 'A+'
    },
    {
      'subject': 'Computer Architecture',
      'grade': 'C'
    }
  ],
  'age': "function() {return 28;}"
};

const javaScriptObject = {
  name: 'abc',
  age: 20,
  sample: function () {
    return "name";
  }
};

let jsonString = '{"name": "Punith", "hasGraduated": true}';

// console.log(`\nConverting JSON to string: ${JSON.stringify(javaScriptObject)}`);

// console.log("\nConverting JSON to javascript object:", JSON.parse(jsonString));

// console.log(`\nConverting date string to JS date object: ${new Date(jsonObject.dob)}`);

// console.log(`\nEvaluate functions as String in JSON object: ${eval('(' + jsonObject.age + ')')()}`);

// // Using ES6 array destructuring
// const { firstName, lastName } = jsonObject.name;
// const { grade, subject } = jsonObject.grades[0];

// console.log(`\nAccessing nested objects:`);
// console.log(`${firstName} ${lastName}, has scored, ${grade}, in ${subject}`);

// var objWithFunction = {
//   name: "John",
//   age: function () {
//     return Date.now() - person.age;
//   },
//   city: "New York",
//   dob: new Date()
// };

// var jsonStringWithoutFunction = JSON.stringify(objWithFunction);

// console.log(`\nFunctions in JS are removed in the JS objects: ${jsonStringWithoutFunction}`);

//Use 'delete' <propertyName> to delete a property from a JSON object
// delete jsonObject.dob;

console.log(jsonObject);

// // Use array map function on json array
// console.log(`\nLoop through array using ES6 map function`)
// jsonObject.grades.map((grade, index) => console.log(`index: ${index}, subject: ${grade.subject}`));

