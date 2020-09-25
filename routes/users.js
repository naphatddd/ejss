const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body, validationResult } = require("express-validator");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("กรุณากรอกชื่อ"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกอีเมล์")
      .isEmail()
      .withMessage("รูปแบบอีเมล์ไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกรหัสผ่าน")
      .isLength({ min: 3 })
      .withMessage("รหัสผ่าน 3 ตัวขึ้นไป"),
  ],
  userController.register
);

router.post('/login',passport.authenticate('local',{
  failureRedirect: '/users/login',
  failureFlash: false
}),userController.login)

module.exports = router;
