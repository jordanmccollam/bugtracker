// Dependancies
var express = require("express");
var handlebars = require("express-handlebars");

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

// Connect to MongoDB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bugtracker";
// mongoose.connect(MONGODB_URI);

// Routes
require("./routes/htmlRoutes")(app);


// Listener
app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
});

