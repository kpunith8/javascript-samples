const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  // Lists all the workers
  const workers = Object.values(cluster.workers);
  // Once the cluster is down, it creates new workers to achieve zero-downtime restarts
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} has crashed.\nStarting a new worker...`);
      cluster.fork();
    }
  });
} else {
  require('./server.js');
}