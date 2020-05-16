const axios = require("axios");

module.exports = {
  getIndex: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
      };
      const result = await axios.get("/products");
      res.render("index", { products: result.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  getUser: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
      };
      const result = await axios.get("/users");
      //res.render("index", { products: result.data });
      console.log(result.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  getUserData: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
      };
      const result = await axios.get("/user_data");
      //res.render("index", { products: result.data });
      console.log(result.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  getOrder: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
      };
      //const result = await axios.get("/orders");
      //console.log("result is ", result.data);
      res.render("cart");
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
      res.render("index", { products: [result.data] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
