// Script to clean files older than 7 days in a directory
// NOTE: Create files using create-files.js script or you can change dirname to delete files in any folder
const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files');

// Read files directory
const files = fs.readdirSync(dirname);

const ms1Day = 24 * 60 * 60 * 1000;

files.forEach(file => {
  const filePath = path.join(dirname, file);

  // read the stats of each file
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    // Check the modified time of the file
    if ((Date.now() - stats.mtime.getTime() > 7 * ms1Day)) {
      fs.unlink(filePath, err => {
        if (err) throw err;

        console.log(`Deleted ${filePath}`);
      });
    }
  });
});