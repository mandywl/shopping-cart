const express = require("express");
const router = express.Router();
const {
  getIndex,
  getUser,
  getUserData,
  getOrder,
  login,
  signup,
  getProductPage,
} = require("../handlers/html");
const {
  checkAuthenticated,
  isNotAuthenticated,
} = require("../../config/middleware/authenticate");

router.route("/").get(checkAuthenticated, getIndex);
router.route("/users").get(checkAuthenticated, getUser);
router.route("/user_data").get(checkAuthenticated, getUserData);
router.route("/orders").get(checkAuthenticated, getOrder);
router.route("/login").get(isNotAuthenticated, login);
router.route("/signup").get(isNotAuthenticated, signup);
router.route("/product/:id").get(checkAuthenticated, getProductPage);

module.exports = router;
