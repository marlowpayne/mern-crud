const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");

const secret = require("../config/secret");
const User = require("../models/User");

// @route GET users/
// @desc Get all users
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }
);

// @route POST users/register
// @desc Register a new user
// @access Public
router.post("/register", (req, res) => {
  // validation
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check for existing user
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.error(err));
        });
      });
    }
  });
});

// @route POST users/login
// @desc Auth user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // validation
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user authed
        const payload = {
          id: user.id,
          name: user.email
        };

        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
