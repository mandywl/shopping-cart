const express = require("express");
const router = express.Router();
const { getIndex, login, signup } = require("../handlers/html");

router.route("/").get(getIndex);
router.route("/login").get(login);
router.route("/signup").get(signup);

module.exports = router;
