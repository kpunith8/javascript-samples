require("@babel/register")({
  presets: ["@babel/preset-env"],
});

const { statement } = require("./statement");

const plays = {
  "1": { type: "tragedy", name: "Romeo Juliet" },
  "2": { type: "comedy", name: "Comedy Of Errors" },
};

const invoice = {
  performances: [
    {
      playID: "1",
      audience: 300,
    },
    {
      playID: "2",
      audience: 190,
    },
  ],
  customer: "Punith K",
};

const invoiceStatement = statement(invoice, plays);

console.log(invoiceStatement);

// Introduce Parameter object
// fn(a,b,c) => fn(alpha)
const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};

const operatingPlan = {
  temperatureFloor: 10,
  temperatureCeiling: 52,
};

function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

const alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

console.log("Alerts:", alerts);

class Range {
  constructor(min, max) {
    this._min = min;
    this._max = max;
  }

  get max() {
    return this._max;
  }

  get min() {
    return this._min;
  }

  contains(temp) {
    return temp >= this.min && temp <= this.max;
  }
}

// Group min and max to an parameter object
// and move the logic to filter to Range class
// so that everything is encapsulated in the class
const range = new Range(10, 54);
function readingsOutsideRangeRefactored(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}

const alerts1 = readingsOutsideRangeRefactored(station, range);

console.log("Alerts Refactored:", alerts1);
