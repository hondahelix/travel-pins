var express = require("express");
var session = require("express-session");
const passport = require("./config/passport");
const routes = require("./routes");

var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
//sets limit to 50mb
app.use(express.json({limit: '50mb'}));
//using static for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//passport 
app.use(session({ secret: "pinwin", resave: true, saveUninitialized: true }));
// initializes passport 
app.use(passport.initialize());
app.use(passport.session());


app.use(routes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });