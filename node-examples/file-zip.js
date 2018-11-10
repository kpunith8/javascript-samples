// Pass file name as second param to the node script

const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

const { Transform } = require('stream');

const progress = Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(progress)
  //.on('data', () => console.log('.')) // To give progress info on data event
  .pipe(fs.createWriteStream(`${file}.gz`))
  .on('finish', () => console.log('Done')); // To print done on finish event