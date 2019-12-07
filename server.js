// Dependancies
var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// Handlebars Config
var app = express();
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var session = require('express-session');

// config express-session
var sess = {
  secret: 'CHANGE THIS TO A RANDOM SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.set('trust proxy', 1);
}

app.use(session(sess));

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    // return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Connect to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bugtracker";
mongoose.connect(MONGODB_URI);

// Routes
// require("./routes/htmlRoutes")(app);

var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ..
app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
// ..


// Listener
app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
});

