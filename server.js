// Dependancies
var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require("passport");
var db = require("./models");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

// Server
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 3000;

// Handlebars Config
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
require("./routes/socket")(app, io);
require("./routes/index")(app);
require("./routes/dashboard")(app, isLoggedIn);
require("./routes/projects")(app, isLoggedIn);
require("./routes/postRoutes")(app)
require("./routes/auth")(app);

// Auth routes ***
app.post("/signup", function(req, res) {
  db.User.register(new db.User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("signup", data = {
        error: err
      });
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/dashboard");
    })
  });
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
}), function(req, res) {});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
// ***

// Listener
http.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
});

