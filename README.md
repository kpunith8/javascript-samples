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

- `multer` package for uploading files

- run `babel` with latest JS features using, `nodemon`
  ```
  // Install babel plugins
  $ npm install babel-cli babel-preset-env --save-dev

  // add the script to package.json
  scripts:
  {
    "babel-node": "babel-node --presets=/*a*/ --ignore='foo|bar|baz'"
  }

  $ nodemon --exec npm run babel-node -- path/to/script.js
  ```

- Add `.babelrc` file to add the `@babel/preset-env` with this entry
    ```json
    {
        "presets": ["@babel/preset-env"]
    }
    ```

