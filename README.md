# Javascript Sample Programs
- Consists of javascript samples, basic to advanced concepts

## Libraries to consider
- bluebird - Promisifies the calls, usage `eg:`
  ```javascript
  var Promise = require('bluebird');
  var fs = Promise.promisifyAll(require('fs'));
  // Check the example in promise-sample.js
  ```
- consider `pm2` module for process or cluster related solutions