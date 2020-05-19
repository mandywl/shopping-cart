const axios = require("axios");

module.exports = {
  getIndex: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello!",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
      };
      const getCurrency = req.query.currency
        ? `/currency?currency=${req.query.currency}`
        : "/currency";
      let currencies = await axios.get(getCurrency);
      currencies = currencies.data;
      const result = await axios.get("/products");
      const products = result.data.map((product) => {
        product.price =
          currencies.symbol + `${(product.price * currencies.rate).toFixed(2)}`;
        return product;
      });
      const choices = Object.keys(currencies.list).filter(
        (key) => key !== currencies.currency
      );
      const symbol = currencies.symbol;
      choices.unshift(currencies.currency);

      res.render("index", { products, choices, symbol });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  login: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Login",
        description: "Login here",
        keywords: "login",
        auth: "",
        noauth: "hidden",
      };
      res.render("login");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  signup: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "signup",
        description: "Signup here",
        keywords: "signup",
        auth: "",
        noauth: "hidden",
      };
      res.render("signup");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  getProductPage: async function(req, res) {
    try {
      const id = req.params.id;
      const result = await axios.get(`/products/${id}`);
      const name = result.data.product_name;
      res.locals.metaTags = {
        title: name,
        description: `${name}'s webpage`,
        keywords: `${name}`,
        noauth: req.noauth,
        auth: req.auth,
      };
      res.render("product", { products: [result.data] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
