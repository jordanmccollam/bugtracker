// Dependancies
var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require("passport");
var db = require("./models/index");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var PORT = process.env.PORT || 3000;

// Handlebars Config
var app = express();
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session config
app.use(session({
  secret: "NotSoSecretSecret",
  resave: false,
  saveUninitialized: false
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// Make public a static folder
app.use(express.static("public"));

// Connect to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bugtracker";
mongoose.connect(MONGODB_URI);

// Routes ***
require("./routes/index")(app);
require("./routes/dashboard")(app, isLoggedIn);
require("./routes/auth")(app);

// Auth routes ***
app.post("/signup", function(req, res) {
  db.User.register(new db.User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("index", data = {
        error: err,
        user: req.user
      });
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/dashboard");
    })
  });
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/"
}), function(req, res) {});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
// ***

// Listener
app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
});

