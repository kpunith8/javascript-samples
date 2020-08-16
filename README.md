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
  (or)
  $ nodemon --exec babel-node /path/file.js
  ```

- Add `.babelrc` file to add the `@babel/preset-env` with this entry
    ```json
    {
        "presets": ["@babel/preset-env"]
    }
    ```

- Use `esm` package to use ES Modules in nodejs app in commandline `node -r esm <filename.js>`

- ES Modules can be used in `node 13.7` (experimental feature) by specifying
  `"type": "module"` in `package.json` and while importing give the file with `extension`
  `import {test} from './test-module.js`

- Pass file name as a param to npm script as follows,
  Making use of `esm` package to compile with ESM modules given file
  ```json
  scripts: {
    "start":"func() { nodemon -r esm $1; }; func",
  }
  ```

- pass the param as follows `npm run start <full-path>` or `npm run start -- <file-name>`

- To get the code coverage for all files using jest, update test script in package.json as, `"jest --watchAll --coverage"`