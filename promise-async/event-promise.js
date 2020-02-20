const EventEmitter = require("events");

class QueryExecutor extends EventEmitter {
  async add(param) {
    try {
      const data = await this.adder(param);
      this.emit("onAdded", data);
    } catch (err) {
      this.emit("addError", err);
    }
    /* Resolve promise using .then pattern, remove 'async' keyword before add()  */
    // this.adder(param)
    //   .then(data => {
    //     this.emit("onAdded", data);
    //   })
    //   .catch(err => {
    //     this.emit("addError", err);
    //   });
  }

  // Create a promise to add async behavior
  adder(param) {
    return new Promise((resolve, reject) => {
      if (param === 0) {
        reject("param cannot be 0");
      }

      resolve(param);
    });
  }
}

const queryExecutor = new QueryExecutor();

queryExecutor.add(10);

// Adder usage
// adder(0).then(data => console.log("using then() on promise:", data) ).catch(err => {console.log(err)});

queryExecutor.on("onAdded", data => {
  console.log("Added with promise from event emitter:", data);
});

queryExecutor.on("addError", err => {
  console.log("Error in adding:", err);
});

module.exports = QueryExecutor;
