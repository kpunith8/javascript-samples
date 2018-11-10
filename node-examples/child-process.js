const { spawn } = require('child_process');

const child = spawn('dir');

child.stdout.on('data', data => {
  console.log(`child stdout: ${data}`);
});

child.stderr.on('data', data => {
  console.error(`child stderr: ${data}`);
});

child.on('exit', (code, signal) => {
  console.log(`child process exited with code ${code} and signal ${signal}`);
});