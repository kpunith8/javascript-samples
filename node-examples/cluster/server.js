const server = require('http').createServer();
const pid = process.pid;

// If the clusters are not created, it both request and creating an server is handled by same pid
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