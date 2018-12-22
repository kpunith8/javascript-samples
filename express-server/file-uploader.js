const express = require('express');
const morgan = require('morgan');
const multer = require('multer');

const app = express();

app.use(morgan('dev'));

const upload = multer({ dest: 'uploads/' });

app.post('upload-test', upload.single('file_to_upload'), (req, res) => {
  res.end(JSON.stringify(req.file, 0, 2));
});

app.listen(3001, (err) => {
  if (err) throw err;
  console.log('Server running on port 3001');
});