// require("@babel/core").transform("code", {});
import babelCore from "@babel/core";
import fetch from "node-fetch";

babelCore.transform("code", {});
/* ASYNCHRONOUS JS */

// console.log("1");
// console.log("3");

// asynchrnous call with setTimeout
setTimeout(() => {
  console.log("2");
}, 0);

// callbacks are the way to achieve asynchronous behaviour
const fetchUsers = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();

  return users;
};

// console.log('Users', fetchUsers())
// Return value from async function should be accessed as follows
// fetchUsers().then(res => {console.log('users', res)})

// if you want use await on the async function, use IIFE
(async () => {
  //console.log('within async IIFE', await fetchUsers())
})();

// for await - ES2018
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

// Using Promise.all() with async-await
const getAllData = async () => {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        return response.json();
      })
    );
    console.log("Users:", users);
    console.log("Posts:", posts);
    console.log("Albums:", albums);
  } catch (err) {
    console.log("Error", err);
  } finally {
    // ES-2018
    console.log("Execute always");
  }
};

// getAllData();

// Above can be done with for-await
const getAllData1 = async () => {
  const promises = urls.map(url => fetch(url));

  for await (let response of promises) {
    const data = await response.json();
    console.log(data);
  }
};

// getAllData1()

// Promises get into JOB queue (Microtask Queue) (ES-2018) and they have highest priority over setTimeout
// and will execute first than the one in Callback Queue

// use, race(), all() from promise API to run different way of hadling the async behaviour

// Star wars APIs
/*
{
	"films": "https://swapi.co/api/films/",
	"people": "https://swapi.co/api/people/",
	"planets": "https://swapi.co/api/planets/",
	"species": "https://swapi.co/api/species/",
	"starships": "https://swapi.co/api/starships/",
	"vehicles": "https://swapi.co/api/vehicles/"
}
*/
const queryAPI = endPoint => {
  return fetch(`https://swapi.co/api/${endPoint}`).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
};

// queryAPI("films")
//   .then(data => console.log("films", data))
//   .catch(err => console.log(err));

// ES-2020 introduces Promise.allSettled() which returns the promises settled
// Available in node, chrome, firefox, safari
Promise.allSettled([
  queryAPI("films").then(films => `${films.count} films`),
  queryAPI("people").then(people => `${people.count} people`),
  queryAPI("starships").then(starships => `${starships.count} starships`)
])
  .then(results => {
    results
      .filter(res => res.status === "fulfilled")
      .map(result => console.log(result.value));
    // filter the results based status === 'rejected' to gather
    // errors from the promise
  })
  .catch(err => {
    console.log(err.errors);
  });

// Promise.any() - resolves if any one of the passed promise resolves,
// fails only when all of the promises are rejected.
// if more than one promise resolves, it returns the first promise resolved
// other promises fulfilled are simple ignored
/* Not available in all the browsers yet (Firefox supports), in stage-3 of TC39 Candidate State*/
// Promise.any([
//   Promise.reject(Error("Failure #1")),
//   Promise.reject(Error("Failure #1")),
//   Promise.resolve(12),
//   Promise.resolve(13)
// ]).then(
//   value => {
//     console.log("Promise.any(), Fulfilled:", value);
//   },
//   err => {
//     console.log("Promise.any(), Rejected", err);
//   }
// );
