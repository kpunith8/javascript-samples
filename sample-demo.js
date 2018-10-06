const Greeter = require('./greeter');
const mySet = require('./data-structure/set-user-defined');
const Queue = require('./data-structure/queue-user-defined');

const g = new Greeter('oo');

const set1 = new mySet();
const set2 = new mySet();
set1.add(1);
set1.add("Punith");

set2.add(1);
set2.add("Punith");

console.log('Set has:', set1.values());
console.log('Union of sets:', set1.subSet(set2));

const queue1 = new Queue();
queue1.enQueue('Punith');
queue1.enQueue('Rama');

console.log('Queue has:', queue1.print());
console.log('Dequeue...');
queue1.deQueue();
queue1.enQueue('Punith');

console.log('Queue has:', queue1.print());

a = 100;
// var i = setInterval(timer, 100);

// function timer() {
//   console.log(a);
//   if (a < 1) {
//     console.log('Reaching Stop');
//     clearInterval(i);
//     return;
//   }
//   a -= 1;
// }

const fruits = ['Apple', 'Grape', 'Orange', 'Pear', 'Peach', 'Odos'];

const fruitsStartsWithP = fruits.filter(element => element.startsWith('P')).map(element => element.toLocaleUpperCase());

let oOnlyFruits = [];
for (let index = 0; index < fruits.length; index++) {
  const element = fruits[index];

  if (element.startsWith('O')) {
    oOnlyFruits[oOnlyFruits.length] = element;
  }
}

console.log('Using forEach', oOnlyFruits);

console.log('Using filter', fruitsStartsWithP);

