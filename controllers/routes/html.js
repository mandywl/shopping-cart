const express = require("express");
const router = express.Router();
const {
  getIndex,
  getOrder,
  login,
  signup,
  getProductPage,
} = require("../handlers/html");

const {
  isAuthenticated,
  checkAuthenticated,
  isNotAuthenticated,
} = require("../../config/middleware/authenticate");

router.route("/").get(checkAuthenticated, getIndex);
router.route("/orders").get(isAuthenticated, getOrder);
router.route("/login").get(isNotAuthenticated, login);
router.route("/signup").get(isNotAuthenticated, signup);
router.route("/product/:id").get(checkAuthenticated, getProductPage);

module.exports = router;
