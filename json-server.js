var http = require('http');
var fs = require('fs');

const loadAlbumList = (callback) => {
  fs.readdir('albums', (err, files) => {
    if (err) {
      callback(err);
    } else {
      // condition to check only for directories not any other files
      let listOfDirs = [];

      const iterator = (index) => {
        if (index === files.length) {
          callback(null, listOfDirs);
          return;
        }

        fs.stat('albums/' + files[index], (err, stats) => {
          if (stats.isDirectory()) {
            listOfDirs.push(files[index]);
          }

          iterator(index + 1);
        });
      };
      /** This will return empty list because of asnyc way of handling it,
       * this can be solved writing recurrsive function, in this case iterator function above
        for (let i = 0; files && i < files.length; i++) {
        fs.stat('albums/' + files[i], (err, stats) => {
          if (stats.isDirectory()) {
            listOfDirs.push(files[i]);
          }
        });
      }
      */
      iterator(0);
    }
  });
}

const handle_incoming_request = (req, res) => {
  console.log('INCOMING REQUEST:', req.method, req.url);

  loadAlbumList((err, albums) => {
    if (err) {
      res.writeHead(500, {
        'Content-type': 'application/json'
      });
      re.end(JSON.stringify({ code: 'Cannot load albums', message: err.message }));
    } else {
      var output = { error: null, data: { albums: albums } };
      res.writeHead(200, {
        'Content-type': 'application/json'
      });

      res.end(JSON.stringify(output));
    }
  });
}

const server = http.createServer(handle_incoming_request);
server.listen(3008);