const express = require("express");
const router = express.Router();
const {
  getIndex,
  getOrder,
  login,
  signup,
  getProductPage,
} = require("../handlers/html");

router.route("/").get(getIndex);
router.route("/orders").get(getOrder);
router.route("/login").get(login);
router.route("/signup").get(signup);
router.route("/product/:id").get(getProductPage);

module.exports = router;
