const axios = require("axios");

const handleCurrency = (currencies, products) => {
  return products.data.map((product) => {
    product.price =
      currencies.symbol + `${(product.price * currencies.rate).toFixed(2)}`;
    return product;
  });
};

const handlePages = (
  page,
  limit,
  total,
  categoriesIn,
  currencies,
  category
) => {
  const categories = categoriesIn.map((cat) => {
    cat.active = cat.category === category ? "active" : "";
    cat.active === "active" ? (total = cat.count) : "";
    return cat;
  });

  let pages = [];
  let pageMax = Math.ceil(total / limit);
  for (let i = 1; i <= pageMax; i++) {
    let temp = { page: i };
    temp.active = i === parseInt(page) ? "active" : "";
    pages.push(temp);
  }
  const choices = Object.keys(currencies.list).filter(
    (key) => key !== currencies.currency
  );
  choices.unshift(currencies.currency);
  return { choices, pages, categories };
};

module.exports = {
  getIndex: async function(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 8;
      const category = req.query.category || "all";
      const categoryString =
        category.charAt(0).toUpperCase() + category.slice(1);
      const offset = (page - 1) * limit;
      const getCurrency = req.query.currency
        ? `/currency?currency=${req.query.currency}`
        : "/currency";
      const currenciesRaw = await axios.get(getCurrency);
      const productsRaw = await axios.get(
        `/products?limit=${limit}&offset=${offset}&category=${category}`
      );
      const categoriesRaw = await axios.get("/categories");
      const symbol = currenciesRaw.symbol;
      let total = categoriesRaw.data.reduce((acc, curr) => acc + curr.count, 0);

      const products = handleCurrency(currenciesRaw.data, productsRaw);
      const { choices, pages, categories } = handlePages(
        page,
        limit,
        total,
        categoriesRaw.data,
        currenciesRaw.data,
        category
      );

      res.locals.metaTags = {
        title: categoryString,
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: req.noauth,
        auth: req.auth,
        categories,
      };

      return res.render("index", {
        pages,
        categoryString,
        products,
        choices,
        symbol,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
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

      const getCurrency = req.query.currency
        ? `/currency?currency=${req.query.currency}`
        : "/currency";

      let currencies = await axios.get(getCurrency);
      currencies = currencies.data;
      const product = result.data;
      product.price =
        currencies.symbol + `${(product.price * currencies.rate).toFixed(2)}`;

      const choices = Object.keys(currencies.list).filter(
        (key) => key !== currencies.currency
      );
      const symbol = currencies.symbol;
      choices.unshift(currencies.currency);

      res.locals.metaTags = {
        title: name,
        description: `${name}'s webpage`,
        keywords: `${name}`,
        noauth: req.noauth,
        auth: req.auth,
      };
      console.log(product);

      res.render("product", { product, choices, symbol });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
