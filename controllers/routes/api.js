const express = require("express");
const router = express.Router();
const { getApi } = require("../handlers/api");

router.route("/api/products").get(getApi);

module.exports = router;
