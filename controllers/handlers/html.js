const axios = require("axios");

module.exports = {
  getIndex: async function(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 8;
      let category = req.query.category || "all";
      const offset = (page - 1) * limit;
      const results = await axios.get(
        `/products?limit=${limit}&offset=${offset}&category=${category}`
      );
      let categories = await axios.get("/categories");
      categories = categories.data;
      let total = categories.reduce((acc, curr) => acc + curr.count, 0);
      categories = categories.map((cat) => {
        cat.active = cat.category === category ? "active" : "";
        cat.active === "active" ? (total = cat.count) : "";
        return cat;
      });
      let pageMax = Math.ceil(total / limit);
      let pages = [];
      for (let i = 1; i <= pageMax; i++) {
        let temp = { page: i };
        temp.active = i === parseInt(page) ? "active" : "";
        pages.push(temp);
      }
      count = res.locals.metaTags = {
        title: "Hello!",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
        categories,
      };
      category = category.charAt(0).toUpperCase() + category.slice(1);
      res.render("index", { pages, category, products: results.data });
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
