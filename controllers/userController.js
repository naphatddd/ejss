const User = require("../models/users");
const { validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const result = validationResult(req);
  const errors = result.errors;

  //check validation
  if (!result.isEmpty()) {
    res.render("register", { errors: errors });
  } else {
    //insert data
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
    });
    res.location("/");
    res.redirect("/");
    console.log(newUser);
  }

  //   console.log(name, email, password);
  //   res.redirect("/");
};

exports.login = async (req, res, next) => {
  res.redirect("/");
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});
