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


// console.log('\nConverting JSON to string:', JSON.stringify(jsonObject));

// console.log('\nConverting date string to JS date object:', new Date(jsonObject.dob));

//console.log('Functions as String in JSON object:', eval('(' + jsonObject.age + ')')());

//console.log('Accessing nested object:', jsonObject.name.firstName, jsonObject.name.lastName, 'has scored', , 'in', jsonObject.grades[1].subject);

let jsonString = '{"name": "Punith", "hasGraduated": true}';

//console.log('Parse JSON object to JS object:', JSON.parse(jsonString));

// var objWithFunction = { name: "JjsonObject.grades[1].gradeohn", age: function () { return Date.now() - person.age; }, city: "New York", dob: new Date() };
// var jsonStringWithoutFunction = JSON.stringify(objWithFunction);

// console.log('Functions in JS are removed in the JS objects:', jsonStringWithoutFunction);

//use delete propertyName to delete from a JSON object
//console.log('\nConverting JSON to string:', JSON.stringify(jsonObject));

// Use array map function on json array
jsonObject.grades.map(grade => console.log(grade.subject));