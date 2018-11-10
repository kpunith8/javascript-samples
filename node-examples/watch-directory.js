// Watch one directory and report, file added, removed, and changed events
const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files');

// Read files directory
const files = fs.readdirSync(dirname);

const logWithTime = message => {
  console.log(`${new Date().toUTCString()}: ${message}`);
}

fs.watch(dirname, (eventType, fileName) => {
  if (eventType === 'rename') { // event for adding or removing a file
    const index = files.indexOf(fileName);

    if (index >= 0) {
      files.splice(index, 1);
      logWithTime(`${fileName} was removed`);
      return;
    }

    files.push(fileName);
    logWithTime(`${fileName} was added`);
    return;
  }

  logWithTime(`${fileName} was changed`);
});