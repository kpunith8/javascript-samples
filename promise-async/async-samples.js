const async = require('async');
const fs = require('fs');

function load_file_contents(path, callback) {
  var file_handle;

  async.waterfall([
    function (cb) {
      fs.open(path, 'r', cb);
    },

    function (handle, cb) {
      if (!handle) {
        cb({
          error: "Invalid handle",
          message: "Bad file handle from fs.open()"
        });
      } else {
        file_handle = handle;
        cb(null, handle);
      }
    },

    function (handle, cb) {
      fs.fstat(handle, cb);
    },

    function (stats, cb) {
      if (stats.isFile()) {
        var buffer = new Buffer(stats.size);
        fs.read(file_handle, buffer, 0, stats.size, null, cb);
      } else {
        cb({
          error: "not a file",
          message: "Can't load directory"
        });
      }
    },

    function (bytes_read, buf, cb) {
      fs.close(file_handle, err => {
        cb(null, buf.toString('utf8', 0, bytes_read));
      });
    }
  ], callback);
}

load_file_contents('async-samples.js', (err, contents) => {
  if (err) {
    console.log(JSON.stringify(err));
  } else {
    console.log(contents);
  }
});
