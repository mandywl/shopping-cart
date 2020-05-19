/* eslint-disable camelcase */
const { promisify } = require("util");
const fs = require("fs");
const { Users, Products, Orders } = require("../../models/models");
const csvName = "product-list.csv";
const productList = `util/${csvName}`;
const { Sequelize } = require("../../config/connectionDb");
const readFileAsync = promisify(fs.readFile);

fs.watchFile(productList, { interval: 1000 }, async () => {
  try {
    const list = await readFileAsync(productList, "utf-8");
    const lines = list.split(/\n/);
    const data = lines.map((line) => line.split(/,/));
    data.shift();
    data.forEach(async (row) => {
      try {
        const [id, product_name, description, price, img, category] = row;
        const productValues = {
          product_name,
          description,
          price,
          img,
          category,
        };
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

Users.hasMany(Orders);
Products.hasMany(Orders);
Orders.belongsTo(Users);
Orders.belongsTo(Products);

module.exports = {
  getCategories: async (req, res) => {
    try {
      const result = await Products.findAll();
      const categories = result.reduce((acc, current) => {
        const x = acc.find((item) => item.category === current.category);
        if (!x) {
          const temp = { category: current.category, count: 1 };
          return acc.concat([temp]);
        } else {
          x.count++;
          return acc;
        }
      }, []);
      return res.json(categories);
    } catch (err) {
      console.log(err);
    }
  },
  getApi: async function(req, res) {
    try {
      const { offset, limit } = req.query;
      const query = {};
      query.offset = parseInt(offset);
      query.limit = parseInt(limit);
      query.where =
        req.query.category === "all" ? {} : { category: req.query.category };
      const result = await Products.findAll(query);
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  getOrder: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
        noauth: "",
        auth: "hidden",
      };
      const results = await Orders.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Products,
            where: { id: Sequelize.col("orders.productId") },
          },
        ],
      });
      const orders = results
        .map((res) => res.dataValues.product.dataValues)
        .reduce((acc, current) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            current.qty = 1;
            current.subtotal = current.price;
            return acc.concat([current]);
          } else {
            x.qty++;
            x.subtotal = (x.qty * x.price).toFixed(2);
            return acc;
          }
        }, []);
      const total = orders
        .reduce((acc, curr) => {
          return acc + parseFloat(curr.subtotal);
        }, 0)
        .toFixed(2);

      const { first_name, last_name, address } = req.user;
      return res.render("cart", {
        orders,
        total,
        first_name,
        last_name,
        address,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  orderItem: async function(req, res) {
    try {
      const values = {
        productId: req.params.id,
        userId: req.user.id,
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
  checkoutOrder: async function(req, res) {
    try {
      const result = await Orders.destroy({ where: { userId: req.user.id } });
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
};
