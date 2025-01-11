// Promise allSettled
const data = Promise.allSettled([
  Promise.resolve("hello"),
  Promise.reject("Error"),
]);
// .then(res => {
//   const result = res.filter(p => p.status === 'fulfilled')
//   const aa = res.filter(s => s.status === 'rejected')
//   if (aa.length > 0) throw aa
//   return result
// }).catch(err => console.log({ err }))

const getData = async () => {
  const [promise1, promise2] = await data;

  console.log({ promise1, promise2 });
};

getData();

const user = {
  name: "Punith",
};

const userConfig = {
  settings: {
    darkMode: true,
    notify: true,
  },
};

const userPromise = new Promise((res) => setTimeout(() => res(user), 1000));
const userConfigPromise = new Promise((res, rej) =>
  setTimeout(() => rej(new Error("no user config")), 2000)
);

const userData = Promise.all([userPromise, userConfigPromise]);

const getUserData = async (setData = () => {}) => {
  try {
    const [user, config] = await userData;
    setData({ user, config });
    return { ...user, ...config };
  } catch (error) {
    console.log(error);
  }
};

console.log(
  "User data:",
  getUserData((data) => console.log({ data }))
);

const { readFile } = require("fs");

function readFilePromisified(filename) {
  return new Promise(function (resolve, reject) {
    readFile(filename, { encoding: "utf8" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromisified("hello") // process.argv[2] - read from the CLI args
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log(
      "I'll run irrespective of a promise returning success or failure"
    );
  });

function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms); // (A)
  });
}

// Using delay():
delay(5000).then(function () {
  // (B)
  console.log("5 seconds have passed!");
});

function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve);
    setTimeout(function () {
      reject(new Error("Timeout after " + ms + " ms")); // (A)
    }, ms);
  });
}

timeout(5000, Promise.resolve("hello"))
  .then(function (value) {
    console.log("Contents: " + value);
  })
  .catch(function (reason) {
    console.error("Error or timeout", reason);
  });

//
const fulfilledThenable = {
  then(reaction) {
    reaction("thenable hello");
  },
};

// then method in a object is converted to a promise
const promise = Promise.resolve(fulfilledThenable);
promise.then((x) => console.log(x));
