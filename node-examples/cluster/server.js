const server = require('http').createServer();
const pid = process.pid;

// If the clusters are not created, both request and creating an server is handled by same pid
server.on('request', (req, res) => {
  switch (req.url) {
    case '/home':
      res.end(`Handled by process, ${pid}`);
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }
});

server.listen(8000, () => {
  console.log(`Started process, ${pid}`)
});

// Random timeout to kill a process, to test cluster to create new workers to handle the process efficiently
// setTimeout(() => {
//   process.exit(1);
// }, Math.random() * 10000);