const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const flash = require('express-flash');
const path = require('path');

const PORT = 3004;

const app = express();

app.use(flash());
app.use(session({
  secret: 'cat_on_keyboard',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // development only
}));

app.use(cookieParser('cat_on_keyboard'));
app.use(passport.initialize());
app.use(passport.session());

// To accept form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//1. store user-name and passwords
const users = {
  'id123': { id: 123, username: 'root', password: 'root' },
  'id1': { id: 1, username: 'admin', password: 'admin' },
}

//2. configure passport-local to validate an incoming username and password
passport.use(new LocalStrategy((username, password, done) => {
  for (userId in users) {
    const user = users[userId];

    if ((user.username.toLowerCase() === username.toLowerCase()) && (user.password === password)) {
      return done(null, user);
    }
  }

  return done(null, false, { message: 'Incorrect credentials' });
}));

//3. Serialize users
passport.serializeUser((user, done) => {
  if (users[`id${user.id}`]) {
    done(null, `id${user.id}`);
  } else {
    done(new Error(`Can't serialise this user`));
  }
});

//4. de-serialize users
passport.deserializeUser((userId, done) => {
  if (users[userId]) {
    done(null, users[userId]);
  } else {
    done(new Error(`User doesn't exist`));
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/members',
  failureRedirect: '/error'
}));

// post can also be written as follows,
/*
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/members');
});
*/

app.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, 'error.html'));
});

app.get('/members', authenticatedOrNot, (req, res) => {
  res.send('Secret members area only!!');
});

// Middleware function to validate
function authenticatedOrNot(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/error');
  }
}

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server running in ${PORT}`);
});

