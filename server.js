const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const dbConfig = require("./config/db");
const usersRoute = require("./routes/users");

// connect to Mongo
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.local, { useNewUrlParser: true })
  .then(
    () => console.log("Successfully connected to Mongo"),
    error => console.error("Could not connect to Mongo : " + error)
  );

const app = express();

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// error handling
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});

// passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// cors
app.use(cors());

// routes
app.use("/users", usersRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port " + port));
