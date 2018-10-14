const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = 3003;

const app = express();

// Order of middleware is important
// Middlewares are used across the all the requests in the app

// morgan middleware is used to log after the each request
app.use(require('morgan')('dev'));

// it adds the respone time info to the response headers as X-Response-Time, check it under network tab in chrome tools
app.use(require('response-time')());

// Serving static files using, express.static middleware
// Make sure to separate static files from the app.js and other important data
app.use(express.static(path.join(__dirname, '../albums')));

// To parse data from post requests as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to handle cookies
app.use(cookieParser());

app.use(session({
  secret: "some secret key to encrypt the session",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1800000 }
}));

// Writing user defined middleware
// app.use((req, res, next) => {
//   if (req.url === '/stop') {
//     res.end('STOP');
//   } else {
//     console.log('Don\'t stop');
//     next();
//   }
// });

app.get('/', (req, res) => {
  res.end("Welcome to express server");
});

// isAdmin is a middleware to check whether user is an admin
app.get('/admin/:userId', isAdmin, (req, res) => {
  res.end('Logged in as admin');
});

function isAdmin(req, res, next) {
  let admin = false;

  if (parseInt(req.params.userId) === 100) {
    admin = true;
  }

  if (admin) {
    next();
  } else {
    res.end('No authrization to access');
  }
}

// Regular expression can be used to match the URLs
// app.all() can also be used, instaed of all

// If userId > 10000 call some other route or call Legacy code
app.get("/user[s]?/:userId", (req, res, next) => {
  if (parseInt(req.params.userId) < 10000) {
    // Here next() is called an middleware
    next();
  } else {
    res.end("You asked for user: " + req.params.userId);
  }
});

app.get("/user[s]?/:userId", (req, res) => {
  res.end("You asked for Legacy User: " + req.params.userId);
});

app.post('*', (req, res) => {
  res.end(JSON.stringify(req.body));
});

// Setting and using sessions
app.get('*', (req, res) => {
  // Cookie created for an day
  let lastAccessedDate = req.session.last_access;
  req.session.last_access = new Date();

  res.cookie("name", "punith", { expires: new Date(Date.now() + 864000000) });

  // res.clearCookie("name");

  res.end('Cookie in the client: ' + JSON.stringify(req.cookies) + 'This page last accessed at: ' + lastAccessedDate);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('Server running on port:', PORT);
});