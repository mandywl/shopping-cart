const express = require("express");
const router = express.Router();
var passport = require("../../config/passport");
const {
  getApi,
  userLogin,
  userSignup,
  userLogout,
} = require("../handlers/api");

router.route("/api/products").get(getApi);
router.route("/api/login").post(passport.authenticate("local"), userLogin);
router.route("/api/signup").post(userSignup);
router.route("/logout").get(userLogout);

module.exports = router;
