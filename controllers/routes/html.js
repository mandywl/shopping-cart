const express = require("express");
const router = express.Router();
const { getIndex, login, signup, getProductPage } = require("../handlers/html");
const {
  checkAuthenticated,
  isNotAuthenticated,
} = require("../../config/middleware/authenticate");

router.route("/").get(checkAuthenticated, getIndex);
router.route("/login").get(isNotAuthenticated, login);
router.route("/signup").get(isNotAuthenticated, signup);
router.route("/product/:id").get(checkAuthenticated, getProductPage);

module.exports = router;
