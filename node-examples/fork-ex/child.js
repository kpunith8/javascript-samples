process.on('message', msg => {
  console.log(`Message from parent: ${msg}`);
});

let counter = 0;

setInterval(() => {
  process.send(counter += 1);
}, 1000);