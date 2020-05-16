const express = require("express");
const router = express.Router();
var passport = require("../../config/passport");
const {
  getApi,
  getUser,
  getUserData,
  getOrder,
  userLogin,
  userSignup,
  userLogout,
  getProductData,
} = require("../handlers/api");

router.route("/api/products").get(getApi);
router.route("/api/users").get(getUser);
router.route("/api/user_data").get(getUserData);
router.route("/api/orders").get(getOrder);
router.route("/api/products/:id").get(getProductData);
router.route("/api/login").post(passport.authenticate("local"), userLogin);
router.route("/api/signup").post(userSignup);
router.route("/logout").get(userLogout);

module.exports = router;
