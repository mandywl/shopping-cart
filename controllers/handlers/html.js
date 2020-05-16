const axios = require("axios");

module.exports = {
  getIndex: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
      };
      const result = await axios.get("/products");
      console.log("result is ", result.data);
      res.render("index", { products: result.data });
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
      res.locals.metaTags = {
        title: "signup",
        description: "Signup here",
        keywords: "signup",
      };
      res.render("index", { productDetails: result.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
