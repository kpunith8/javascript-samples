const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(morgan('dev'));

// [BREAKING CHANGE] multer v2: The 'dest' option was removed.
// Use multer.diskStorage() or multer.memoryStorage() instead.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload-test', upload.single('file_to_upload'), (req, res) => {
  res.end(JSON.stringify(req.file, 0, 2));
});

app.listen(3001, (err) => {
  if (err) throw err;
  console.log('Server running on port 3001');
});