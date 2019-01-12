const hello = delay => console.log(`Hello after ${delay} seconds`);

// third parameter passed as param to hello function
// setTimeout(hello, 1000, 1);

// setTimeout(hello, 2 * 1000, 2);

console.log(`current user is ${process.env.USERNAME}`);

// console.log('echo the string using process.stdin and stdout');

// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(chunk);
//   }
// });

// Above function can also be written as follows,
// process.stdin.pipe(process.stdout);