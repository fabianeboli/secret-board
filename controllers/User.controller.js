// import User from "../models/User.model";
// import bcryptjs from "bcryptjs";
// import { check } from "express-validator";
// import passport from "passport";
require("dotenv").config();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const expressValidator = require("express-validator");
const passport = require("passport");
const { check } = expressValidator;

const index = (req, res, next) => {
  res.render("index", { title: "Club House club", user: req.user });
};

const new_user_post = (req, res, next) => {
  const { firstName, lastName, username, password, checkPassword } = req.body;
  //if (password !== checkPassword) return next(error);
  bcryptjs.hash(password, 10, (error, hashedPassword) => {
    if (error) return next(error);
    new User({
      firstName,
      lastName,
      username,
      password: hashedPassword
    }).save(error => {
      if (error) return next(error);
      res.redirect("/");
    });
  });
};

const new_user_get = (req, res, next) => {
  res.render("sign-up");
};

const secret_club_get = (req, res, next) => {
  res.render("secret-club");
};

const secret_club_post = (req, res, next) => {
  if (req.body.passcode === process.env.SECRET_CODE) {
    User.findByIdAndUpdate(
      req.user.id,
      { membership: "FullMember" },
      { new: true },
      (err) => {
        if(err) return next(error);
      }
    );
  }
  res.redirect("/");
};

const logIn_get = (req, res, next) => {
  res.render("logIn");
};

const logIn_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/logIn"
});

const logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  index,
  logIn_get,
  logIn_post,
  new_user_get,
  new_user_post,
  logout,
  secret_club_get,
  secret_club_post
};
