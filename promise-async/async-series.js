const async = require('async');

// It takes 3 seconds to process both the async calls and yields the result after the processing is done
// use parallel instead of series to process the async calls parallely
// use auto, which by default performs parallel processing
async.auto({ // instead of passing array pass an object as follows
  numbers: function (cb) {
    setTimeout(() => {
      cb(null, [1, 2, 3]);
    }, 1000);
  },

  letters: function (cb) {
    setTimeout(() => {
      cb(null, ["a", "b", "c"]);
    }, 2000);
  },
  // It waits for numbers and letters to complete the make the changes and returns the result
  assemble: ["numbers", "letters", (thus_for, cb) => {
    cb(null, {
      numbers: thus_for.numbers.join(", "),
      letters: thus_for.letters.join(", ")
    });
  }]
}, function (err, results) {
  if (err) {
    console.log(JSON.stringify(err));
  } else {
    console.log(results);
  }
});