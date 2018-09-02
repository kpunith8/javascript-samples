// Composition

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(f(x)),
  fold: (f, g) => f(x),
});

const result = Right(3).map(x => x + 1).fold(x => 'error', x => x);

console.log(result);

// Without using the error handling Left/Right
const findColor = name => ({ red: '#ff4444', green: '#44ff44', blue: '#4444ff' })[name]

const getRedColor = findColor('red').slice(1).toUpperCase();

// Finding a color which not exit will throw error on slice(), use Left/Right to handle it

// To check for null return type
const fromNullable = x => x != null ? Right(x) : Left(null);

// Using Left/Right
const findColorWithErrorHandling = name =>
  fromNullable({ red: '#ff4444', green: '#44ff44', blue: '#4444ff' }[name]);

const getBlueColor = findColorWithErrorHandling('yellow')
  .map(color => color)
  .fold(error => `color doesn't exist`, color => color.slice(1).toUpperCase());

console.log(getBlueColor);

const fs = require('fs');

// Imperative
const getPort = () => {
  try {
    const str = fs.readFileSync('config.json');
    const config = JSON.parse(str);

    return config.port;
  } catch (error) {
    return 3000;
  }
};

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(null)
  }
};

// Composible
const getPortComposible = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .chain(config => tryCatch(() => JSON.parse(config))) // using map returns Right(Right(''))) instead use chain to return the actual return value of a function
    .fold(error => 3000, config => config.port);

const portNumber = getPort();

console.log('Port number is:', getPortComposible());

const user = {
  address: {
    street: {
      name: 'First Street',
    }
  }
};

// Imperative
const streetName = user => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
  }

  return 'no street!';
};

// Composible
const streetNameComposible = user =>
  fromNullable(user.address)
    .chain(address => fromNullable(address.street))
    .map(street => street)
    .fold(error => 'no street', street => street.name);

console.log('Composible: ', streetNameComposible(user));
console.log('Imperative:', streetName(user));

// Create Types with semigroups - semigroup: is a type with a concat method
const Sum = x => ({
  x,
  concat: o => Sum(x, o.x),
});

const res = Sum(1).concat(Sum(2));

console.log(res);