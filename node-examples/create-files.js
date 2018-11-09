// Creates 10 files under files directory, with time stamp 9 days backwords from current date
const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files');

// Creates an directory with the name specified
fs.mkdirSync(dirname);

const ms1Day = 24 * 60 * 60 * 1000;

for (let i = 0; i < 10; i++) {
  const filePath = path.join(dirname, `file${i}`);

  fs.writeFile(filePath, i, err => {
    if (err) throw err;

    const time = (Date.now() - i * ms1Day) / 1000;

    fs.utimes(filePath, time, time, err => {
      if (err) throw err;
    });
  });
}