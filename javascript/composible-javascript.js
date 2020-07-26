const nextCharForNumberString = (str) =>
  String.fromCharCode(parseInt(str.trim()) + 1);

console.log("next char:", nextCharForNumberString(" 64 "));

// compose the above code as follows
const composeNextCharForNumberString = (str) =>
  [str]
    .map((s) => s.trim())
    .map((r) => parseInt(r))
    .map((i) => i + 1)
    .map((t) => String.fromCharCode(t));

console.log("Compose next char:", composeNextCharForNumberString(" 65 "));

// above code can be composed with a Box, instead of using [] array
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x), // to reveal the output from the box
  inspect: () => `Box(${x})`,
});

const composeNextCharForNumberStringWithBox = (str) =>
  Box(str)
    .map((s) => s.trim())
    .map((r) => parseInt(r))
    .map((i) => i + 1)
    .map((t) => String.fromCharCode(t))
    .fold((c) => c.toLowerCase());

console.log(
  "Compose next char with Box:",
  composeNextCharForNumberStringWithBox(" 77 ")
);

// Calculate Discount
const moneyToFloat = (str) => parseFloat(str.replace(/\$/g, ""));

const percentToFloat = (str) => {
  const replaced = str.replace(/\%/g, "");
  const num = parseFloat(replaced);
  return num * 0.01;
};

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price);
  const savings = percentToFloat(discount);

  return cost - cost * savings;
};

console.log("Apply discount, imperative way:", applyDiscount("$12.00", "18%"));

// Compose with Box
const moneyToFloatBox = (str) =>
  Box(str)
    .map((s) => s.replace(/\$/g, ""))
    .map((r) => parseFloat(r));

const percentToFloatBox = (str) =>
  Box(str.replace(/\%/g, ""))
    .map((replaced) => parseFloat(replaced))
    .map((number) => number * 0.01);

// Applying multiple values
const applyDiscountBox = (price, discount) =>
  moneyToFloatBox(price).fold((cost) =>
    percentToFloatBox(discount).fold((savings) => cost - cost * savings)
  );

console.log(
  "Apply discount, compose with Box:",
  applyDiscountBox("$15.00", "15%")
);

// Either: Composition

const Right = (x) => ({
  inspect: () => `Right(${x})`,
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  concat: (o) =>
    o.fold(
      (e) => Left(e),
      (r) => Right(x.concat(r))
    ),
});

const Left = (x) => ({
  inspect: () => `Left(${x})`,
  map: (f) => Left(x), // Ignores the value
  fold: (f, g) => f(x),
  concat: (o) => Left(x),
});

const RightWithChain = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
});

const LeftWithChain = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(f(x)),
  fold: (f, g) => f(x),
});

const result = Right(3) // switch it to Left to see the error function being invoked
  .map((x) => x + 1)
  .fold(
    (x) => "error",
    (x) => x
  );

console.log("Either, Right/Left", result);

// Without using the error handling Left/Right
const findColor = (name) =>
  ({ red: "#ff4444", green: "#44ff44", blue: "#4444ff" }[name]);

const findColorWithEither = (name) => {
  const found = { red: "#ff4444", green: "#44ff44", blue: "#4444ff" }[name];

  return found ? Right(found) : Left(null);
};

const findGreenColor = findColorWithEither("green") // pass yellow as name of the color to get the error handler
  .map((c) => c.slice(1))
  .fold(
    (e) => `Color doesn't exist`,
    (c) => c.toUpperCase()
  );

console.log("findGreenColor with Either:", findGreenColor);

const getRedColor = findColor("red").slice(1).toUpperCase();

// Finding a color which not exit will throw error on slice(), use Left/Right to handle it

// To check for null return type
const fromNullable = (x) =>
  x != null ? RightWithChain(x) : LeftWithChain(null);

// Using Left/Right
const findColorWithErrorHandling = (name) =>
  fromNullable({ red: "#ff4444", green: "#44ff44", blue: "#4444ff" }[name]);

const getBlueColor = findColorWithErrorHandling("yellow")
  .map((color) => color)
  .fold(
    (error) => `color doesn't exist`,
    (color) => color.slice(1).toUpperCase()
  );

console.log(getBlueColor);

const fs = require("fs");

// Imperative
const getPort = () => {
  try {
    const str = fs.readFileSync("../node-examples/config.json");
    const config = JSON.parse(str);

    return config.port;
  } catch (error) {
    return 3000;
  }
};

const tryCatch = (f) => {
  try {
    return RightWithChain(f());
  } catch (e) {
    return LeftWithChain(null);
  }
};

// Composible
const getPortComposible = () =>
  tryCatch(() => fs.readFileSync("../node-examples/config.json"))
    .chain((config) => tryCatch(() => JSON.parse(config))) // using map returns Right(Right(''))) instead use chain to return the actual return value of a function
    .fold(
      (error) => 3000,
      (config) => config.port
    );

const portNumber = getPort();
console.log("Port number, imperative", portNumber);

console.log("Port number, composed:", getPortComposible());

const user = {
  address: {
    street: {
      name: "First Street",
    },
  },
};

// Imperative
const streetName = (user) => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
  }

  return "no street!";
};

// Composible
const streetNameComposible = (user) =>
  fromNullable(user.address)
    .chain((address) => fromNullable(address.street))
    .map((street) => street)
    .fold(
      (error) => "no street",
      (street) => street.name
    );

console.log("Composible:", streetNameComposible(user));
console.log("Imperative:", streetName(user));

// Semi-Groups
// Semi group is a type with a concat method
const Sum = (x) => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  fold: (f) => f(x),
  inspect: () => `Sum(${x})`,
});

Sum.empty = () => Sum(0);

// Could be Product Semi-group, with Product.empty = () => Product(1)
console.log(
  "Sum semigroup:",
  Sum(4)
    .concat(Sum(2))
    .fold((x) => x)
);

// semi-group for (true && false), (true && true) type
const All = (x) => ({
  x,
  concat: ({ x: y }) => All(x && y), // Any(x || y), Any.empty = () => Any(false)
  fold: (f) => f(x),
  inspect: () => `All(${x})`,
});

All.empty = () => All(true);

const Max = (x) => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y), // Min(x < y ? x : y), Min.empty = () => Min(Infinity)
  fold: (f) => f(x),
});

Max.empty = () => Max(-Infinity);

console.log(
  "All semigroup:",
  All(true)
    .concat(All(false))
    .fold((x) => x)
);

const LazyBox = (g) => ({
  fold: (f) => f(g()),
  map: (f) => LazyBox(() => f(g())),
});

// Currying

const modulo = (divisor) => (dividend) => dividend % divisor;
const isOdd = modulo(2);

console.log("Currying: isOdd:", isOdd(11));

const filterCurr = (predicate) => (arr) => arr.filter(predicate);

const getAllOdds = filterCurr(isOdd);

const mapCurr = (f) => (arr) => arr.map(f);

console.log("Currying: Get all odds:", getAllOdds([1, 2, 3, 4, 5, 6, 7, 8, 9]));

const replace = (regex) => (replaceWith) => (str) =>
  str.replace(regex, replaceWith);

const censoredText = replace(/[aeiou]/gi)("*");

const replacedStr = censoredText("Hello There!");

console.log("Currying: Replace text:", replacedStr);

// Compose mapCurr with censoredText to apply the transformation on an array
const censorAll = mapCurr(censoredText);

console.log(
  "Currying: Map on curried censor text:",
  censorAll(["This is", "Really Cool"])
);
