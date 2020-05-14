const express = require("express");
const router = express.Router();
const { getIndex, login, signup, getProductPage } = require("../handlers/html");

router.route("/").get(getIndex);
router.route("/login").get(login);
router.route("/signup").get(signup);
router.route("/product/:id").get(getProductPage);

module.exports = router;
