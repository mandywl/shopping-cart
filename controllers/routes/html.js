const express = require("express");
const router = express.Router();
const { getIndex } = require("../handlers/html");

router.route("/").get(getIndex);

module.exports = router;
