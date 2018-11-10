// Fork a child process and listem to child events
const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', data => {
  console.log(`Message from child: ${data}`);
});

forked.send('Hello World');