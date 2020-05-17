/* eslint-disable camelcase */
const { promisify } = require("util");
const fs = require("fs");
const { Users, Products, Orders } = require("../../models/models");
const csvName = "product-list.csv";
const productList = `util/${csvName}`;

const readFileAsync = promisify(fs.readFile);

fs.watchFile(productList, { interval: 1000 }, async () => {
  try {
    const list = await readFileAsync(productList, "utf-8");
    const lines = list.split(/\n/);
    const data = lines.map((line) => line.split(/,/));
    data.shift();
    data.forEach(async (row) => {
      try {
        const [id, product_name, description, price, img] = row;
        const productValues = { product_name, description, price, img };
        const product = await Products.findOne({ where: { id: id } });
        if (product) {
          product.update(productValues);
        } else {
          Products.create(productValues);
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  getApi: async function(req, res) {
    try {
      const result = await Products.findAll();
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  getOrder: async function(req, res) {
    try {
      const result = await Orders.findAll();
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  orderItem: async function(req, res) {
    try {
      const values = {
        product_id: req.params.id,
        user_id: req.user.id,
      };
      const result = await Orders.create(values);
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  getProductData: async function(req, res) {
    try {
      const id = req.params.id;
      result = await Products.findOne({ where: { id } });
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  userLogin: async function(req, res) {
    try {
      return res.json(req.user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  userSignup: async function(req, res) {
    try {
      const { email, first_name, last_name, address, password } = req.body;
      await Users.create({
        email,
        first_name,
        last_name,
        address,
        password,
      });
      return res.redirect("/login");
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: err.code });
    }
  },
  userLogout: async function(req, res) {
    try {
      req.logout();
      return res.redirect("/");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
};
