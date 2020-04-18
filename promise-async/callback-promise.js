import fs from "fs";
import fetch from "node-fetch"; // to simulate window.fetch() in node apps, or consider axios
import util from "util"; // used for promisify

const divideCallBack = (x, y, cb) => {
  if (y <= 0) cb(new Error("Denominator should be greater than 0!"));

  const result = x / y;
  cb(null, result);
};

divideCallBack(5, 2, (err, res) => {
  if (err) throw err;
  console.log("Divide callback: Result", res);
});

divideCallBack(10, 2, (err, res) => { // change second param to 0
  if (err) throw err;
  console.log("Divide callback: Result", res);
});

/* Samer Buna : Plural sight */

/* Creating function to return a callback accepting a filename */
const readFileAsArray1 = (file, cb) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      return cb(err);
    }
    const lines = data.toString().trim().split("\n");
    cb(null, lines);
  });
};

// Example call
readFileAsArray1("./numbers", (err, lines) => {
  if (err) throw err;

  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter((number) => number % 2 === 1);

  //console.log('Odd numbers count:', oddNumbers);
});

// Converting the above function to return Promise, it helps avoiding the callbacks
// Keep both Promise and callbacks for the consumption, user can use either of them,
// Make sure callback provided with a default callback
// Below function can be invoked in both the ways, one specified above, callback way and another Promise way

const readFileAsArray = (file, cb = () => {}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return reject(err);
      }

      const lines = data.toString().trim().split("\n");
      resolve(lines);
      cb(null, lines);
    });
  });
};

const oddCountCallBacks = () =>
  readFileAsArray("../numbers", (err, lines) => {
    if (err) throw err;

    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter((number) => number % 2 === 1);

    console.log("Odd numbers count, using callbacks:", oddNumbers.length);
  });

// oddCountCallBacks();

const oddCountPromise = () =>
  readFileAsArray("../numbers")
    .then((lines) => {
      const numbers = lines.map(Number);
      const oddNumbers = numbers.filter((number) => number % 2 === 1);

      console.log("Odd numbers count, using Promise:", oddNumbers.length);
    })
    .catch(console.error);

// oddCountPromise();

/* Handling it asnyc way, using async, await feature */
async function countOddAsync() {
  try {
    const lines = await readFileAsArray("../numbers");
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter((number) => number % 2 === 1);

    console.log("Odd numbers count, using async:", oddNumbers.length);
  } catch (err) {
    console.error(err);
  }
}

// countOddAsync();

/* egghead.io course on Promises */

const API_URL = "https://starwars.egghead.training/";

// fetch(API_URL + 'films')
//   .then(response => response.json()
//     .then(films => getFilmTitles(films)),
//     error => console.log(error.message)); // error handling

/* error handling using catch on json response or bad path */
// fetch(API_URL + 'films') // change this to movies to throw an error if response is not OK
//   .then(response => {
//     if (!response.ok) {
//       throw Error('Unsuccessful response');
//     }
//     return response.json().then(films => getFilmTitles(films)) // Promise.reject('Invalid JSON')
//   })
//   .catch(error => console.warn(error));

// const getFilmTitles = films =>
//   films.sort((a, b) => a.episode_id - b.episode_id)
//     .map(film => console.log(`${film.episode_id}. ${film.title}`));

console.log("Loading...");

/* promisify node's readFile */
// const readFile = util.promisify(fs.readFile);

// readFile(__filename, 'utf-8')
//   .then(contents => console.log(contents))
//   .catch(error => console.log(error));

const queryAPI = (endPoint) => {
  return fetch(API_URL + endPoint).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
};

/* Promise.all() resolves the promise in the  same as order in which the promises are passed to the query.
This helps in running promises in parallel,
attach error handling to the promise to handle failure of any one of the promise
*/

Promise.all([
  queryAPI("films"), // change it to movies to produce the error
  queryAPI("planets"),
])
  .then(([films, planets]) =>
    console.log(`Films: ${films.length}, Planets: ${planets.length}`)
  )
  .catch((err) => console.log(":(", err.message));
