const express = require("express");
const router = express.Router();
var passport = require("../../config/passport");
const {
  getApi,
  getOrder,
  orderItem,
  updateItem,
  deleteItem,
  userLogin,
  userSignup,
  userLogout,
  getProductData,
  checkoutOrder,
  getCategories,
} = require("../handlers/api");

const { getCurrency } = require("../../util/currency");

const {
  isAuthenticated,
  apiAuthenticated,
} = require("../../config/middleware/authenticate");

router.route("/api/products").get(getApi);
router.route("/api/categories").get(getCategories);
router.route("/api/currency").get(getCurrency);
router
  .route("/orders")
  .get(isAuthenticated, getOrder)
  .delete(isAuthenticated, checkoutOrder);
router
  .route("/api/order/:id")
  .get(apiAuthenticated, orderItem)
  .put(apiAuthenticated, updateItem)
  .delete(apiAuthenticated, deleteItem);
router.route("/api/products/:id").get(getProductData);
router.route("/api/login").post(passport.authenticate("local"), userLogin);
router.route("/api/signup").post(userSignup);
router.route("/logout").get(userLogout);

module.exports = router;
