const server = require('http').createServer();

server.on('request', (req, res) => {
  console.log('URL requests', req.url); // it has routes value
  switch (req.url) {
    case '/home':
    case '/about':
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end(`You are in ${req.url} page`);
      break;
    case '/':
      res.writeHead(301, { 'Location': '/home' });
      res.end();
    default:
      res.writeHead(404);
      res.end();
      break;
  }
});

server.listen(8000, () => {
  console.log('Listening to port 8000');
});

// Terminating the server
// server.timeout = 1000;

