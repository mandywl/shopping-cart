const express = require("express");
const router = express.Router();
var passport = require("../../config/passport");
const {
  getApi,
  getOrder,
  userLogin,
  userSignup,
  userLogout,
  getProductData,
} = require("../handlers/api");

const { isAuthenticated } = require("../../config/middleware/authenticate");

router.route("/api/products").get(getApi);
router.route("/api/orders").get(isAuthenticated, getOrder);
router.route("/api/products/:id").get(getProductData);
router.route("/api/login").post(passport.authenticate("local"), userLogin);
router.route("/api/signup").post(userSignup);
router.route("/logout").get(userLogout);

module.exports = router;
