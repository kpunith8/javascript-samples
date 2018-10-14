const Promise = require('bluebird');
const open = Promise.promisify(require('fs').open);
const fstat = Promise.promisify(require('fs').fstat);
const read = Promise.promisify(require('fs').read);
const close = Promise.promisify(require('fs').close);

function load_file_contents(filename, callback) {
  const errorHandler = err => {
    console.log('Error:', JSON.stringify(err));
    callback(err, null);
  }

  open(filename, 'r')
    .then(fileHandle => {
      fstat(fileHandle)
        .then(stats => {
          if (stats.isFile()) {
            var buffer = new Buffer(stats.size);
            return read(fileHandle, buffer, 0, stats.size, null)
              .then(close(fileHandle))
              .then(() => {
                callback(null, buffer.toString('utf8', 0, buffer.length));
              }).catch(errorHandler);
          } else {
            callback(null, null);
          }
        }).catch(errorHandler);
    }).catch(errorHandler);
}

load_file_contents('./promise-sample.js', (err, contents) => {
  console.log('content:', contents);
});
