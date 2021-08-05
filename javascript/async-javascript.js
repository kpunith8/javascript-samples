import babelCore from "@babel/core";
import fetch from "node-fetch";
import axios from 'axios'

babelCore.transform("code", {});
/* ASYNCHRONOUS JS */

// console.log("1");
// console.log("3");

// asynchrnous call with setTimeout
// setTimeout(() => {
//   console.log("2");
// }, 0);

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
  "https://jsonplaceholder.typicode.com/albums",
];

// Using Promise.all() with async-await
const getAllData = async () => {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async (url) => {
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
  const promises = urls.map((url) => fetch(url));

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
const queryAPI = (endPoint) => {
  return fetch(`https://swapi.co/api/${endPoint}`).then((response) => {
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
  queryAPI("films").then((films) => `${films.count} films`),
  queryAPI("people").then((people) => `${people.count} people`),
  queryAPI("starships").then((starships) => `${starships.count} starships`),
])
  .then((results) => {
    results
      .filter((res) => res.status === "fulfilled")
      .map((result) => console.log(result.value));
    // filter the results based status === 'rejected' to gather
    // errors from the promise
  })
  .catch((err) => {
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

/* Exploringjs.com */
// Promises
function asyncFunc(num) {
  return new Promise((resolve, reject) => {
    if (num < 100) {
      resolve(num);
    }

    reject("Choose the number less than 100");
  });
}

asyncFunc(10)
  .then((res) => console.log("Async behaviour using Promise", res))
  .catch((err) => console.error(err));

function asyncFunc1(num) {
  return new Promise((resolve, reject) => {
    if (num <= 0) {
      reject("Number should be greater than 0");
    }

    resolve(num * 2);
  });
}

// Chaining then() calls
// then() always returns a Promise, which enables to chain method calls
// Chaining asynchronous function calls via then(), they are executed sequentially, one at a time
asyncFunc(20) // Try Passing 0 to the first Promise to catch the error from the second promise
  .then((num) => {
    console.log("Resolving the first promise:", num);
    return asyncFunc1(num);
  })
  .then((doubledNum) => {
    console.log(
      "Resolving second Promise, second then() in the chain:",
      doubledNum
    );
  })
  .catch((err) => console.error(err));

// Executing async functions in parallel
// Error in any one of the promise ends up in a catch
Promise.all([asyncFunc(19), asyncFunc1(2)])
  .then(([result1, result2]) => {
    console.log("Promise.all():", { result1 }, { result2 });
  })
  .catch((err) => {
    console.log("Error in Promise.all():", err);
  });

// Promise States

// 1. A Promise is always in one of three mutually exclusive states:
//    a) Before the result is ready, the Promise is pending.
//    b) If a result is available, the Promise is fulfilled.
//    c) If an error happened, the Promise is rejected.
// 2. A Promise is settled if "things are done" (if it is either fulfilled or rejected).
// 3. A Promise is settled exactly once and then remains unchanged.

// A Promise is a container for an asynchronously delivered value
// Promise based funtion is blocking
// The result of a Promise is cached and passed to event listeners that are registered after the Promise was settled
function asyncFunc2() {
  const eventEmitter = { success: [] };
  setTimeout(() => {
    for (const handler of eventEmitter.success) {
      handler("DONE");
    }
  }, 100);

  return eventEmitter;
}

asyncFunc2().success.push((x) => console.log("Result:", x));

// Once a result was delivered via a Promise, the Promise stays locked in to that result.
// That means each Promise is always in either one of three (mutually exclusive) states:

// 1. Pending: the result hasn’t been computed, yet (the initial state of each Promise)
// 2. Fulfilled: the result was computed successfully
// 3. Rejected: a failure occurred during computation

// A Promise can only be settled once and then stays settled.

// Examples

// Promisify XMLHttpRequest - node doesn't support XMLHttpRequest need to use node-fetch or axios
// for the same, just an example to demonstrate how to convert an exiting code to Promise based API
function httpGet(url) {
  return new Promise(
    function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status === 200) {
          // Success
          resolve(this.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error(
          'XMLHttpRequest Error: ' + this.statusText));
      };
      request.open('GET', url);
      request.send();
    });
}

// Can be used as, httpGet(url).then(res => console.log(res)).catch(err => console.log(err))

// Delaying an activity
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

delay(500).then(() => console.log('Delayed by 500ms'))

// timeout a promise
function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    promise.then(resolve);
    setTimeout(() =>
      reject(new Error('Timeout after ' + ms + ' ms')), ms);
  });
}

timeout(1000, axios.get('https://jsonplaceholder.typicode.com/todos/1'))
  .then(response =>
    console.log(response.data)
  )
  .catch(err => {
    console.error(err);
  });

// Ways to create Promise
const promise1 = Promise.resolve('Promise with a static resolve() method')
promise1.then(console.log)

// thenables also be converted to a promise; the settlement of the thenable will also become the settlement of the Promise
// thenable is any object that has a method then()
const fulfilledThenable = {
  then(reaction) {
    reaction('Thenables will be converted to a Promise');
  }
};
const promise2 = Promise.resolve(fulfilledThenable);
promise2.then(console.log)

// Promise.reject(err) returns a Promise that is rejected with err:
const myError = new Error('Problem!');
Promise.reject(myError)
  .catch(console.log);

// Whatever you return in an error handler becomes a fulfillment value (not a rejection value)

// Chain a promise when rejected, return a default value when error happens and continue from there resolving
axios.get('hello').catch(err => {
  console.log('some random error:', err.message)
  return 'Use default value because of an error'
}).then(console.log)

