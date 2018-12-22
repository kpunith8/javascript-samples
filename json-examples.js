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

const javaSCriptObject = {
  name: 'abc',
  age: 20,
  sample: function () {
    return "name";
  }
};




// console.log('\nConverting JSON to string:', JSON.stringify(javaSCriptObject));

// console.log('\nConverting date string to JS date object:', new Date(jsonObject.dob));

// console.log('Functions as String in JSON object:', eval('(' + jsonObject.age + ')')());

// console.log('Accessing nested object:', jsonObject.name.firstName, jsonObject.name.lastName, 'has scored', 'in', jsonObject.grades[1].subject, jsonObject.grades[0].grade);

let jsonString = '{"name": "Punith", "hasGraduated": true}';

//console.log('Parse JSON object to JS object:', JSON.parse(jsonString));

// var objWithFunction = { name: "JjsonObject.grades[1].gradeohn", age: function () { return Date.now() - person.age; }, city: "New York", dob: new Date() };
// var jsonStringWithoutFunction = JSON.stringify(objWithFunction);

// console.log('Functions in JS are removed in the JS objects:', jsonStringWithoutFunction);

//use delete propertyName to delete from a JSON object
console.log('\nConverting JSON to javascript object:', JSON.parse(jsonString));

// Use array map function on json array
//jsonObject.grades.map(grade => console.log(grade.subject));