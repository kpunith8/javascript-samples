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
