var express = require("express");
// import User from '../controllers/User.controller';
const User = require("../controllers/User.controller");
var router = express.Router();
const passport = require("passport");
const { body } = require("express-validator");
/* GET home page. */
router.get("/", User.index);

router.get("/sign-up", User.new_user_get);
router.post(
  "/sign-up",
  [
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
    })
  ],
  User.new_user_post
);

router.post("/secret-club", User.secret_club_post);
router.get("/secret-club", User.secret_club_get);

router.post("/logIn", User.logIn_post);
router.get("/logIn", User.logIn_get);

router.get("/logout", User.logout);

module.exports = router;
