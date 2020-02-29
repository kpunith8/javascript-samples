let globalSecret = "1234";

// Module pattern (Revealing pattern) - IIFE - return from a IIFE, and access them separately
// It won'available in global object, doesn't pollute the global object ex: jQuery
// It reduces global scope pollution, but still can be polluted if another script has
// the variable fightModule
const fightModule = (function(globalSecret) {
  function fight(user1, user2) {
    var attack1 = Math.floor(Math.random() * user1.length);
    var attack2 = Math.floor(Math.random() * user2.length);

    return attack1 > attack2 ? `${user1} wins` : `${user2} wins`;
  }
  // we can modify the global variables inside module pattern (try without passing param to IIFE for mutation)
  globalSecret = "10";

  // To avoid global secret mutation, pass it as param to IIFE
  return {
    fight,
    globalSecret
  };
})(globalSecret);

console.log("Module pattern:", fightModule.fight("Harry", "Potter"));
console.log("Module pattern mutating global variables:", globalSecret);
console.log(
  "Module pattern without mutating global variables:",
  fightModule.globalSecret
);

// CommonJS - see greeter.js - Modules are loaded synchronously
// AMD - Asynchronots Module Definition
// UMD - Universal Module Definition

// ES-6 Modules

// To support export/import add, "type": "module" to package.json
// while importing specify the file extension too

export function testPrint(content) {
  return `${content}`;
}
