/* eslint-disable camelcase */
const { Users, Products, Orders } = require("../../models/models");
const { Sequelize } = require("../../config/connectionDb");
const checkCSV = require("../../util/products");
const { handleCurrency } = require("../../util/page-objects");
const axios = require("axios");

Users.hasMany(Orders);
Products.hasMany(Orders);
Orders.belongsTo(Users);
Orders.belongsTo(Products);

setTimeout(() => {
  checkCSV();
}, 2000);

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
      const { first_name, last_name, address } = req.user;

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

      const getCurrency = req.query.currency
        ? `/currency?currency=${req.query.currency}`
        : "/currency";
      let currencies = await axios.get(getCurrency);
      const symbol = currencies.data.symbol;

      const orders = results.map((res) => res.dataValues.product.dataValues);
      const send = { data: orders };
      let { choices, products } = handleCurrency(currencies.data, send);
      if (products.price) {
        const checkout = "disabled";
        return res.render("cart", {
          symbol,
          choices,
          first_name,
          last_name,
          address,
          currency: req.query.currency,
          checkout,
        });
      } else {
        const order = products.reduce((acc, current) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            symb = current.price.slice(0, current.price.indexOf(";") + 1);
            price = parseFloat(
              current.price.slice(
                current.price.indexOf(";") + 1,
                current.price.length
              )
            ).toFixed(2);

            current.qty = 1;
            current.subtotal = `${symb}${price}`;

            return acc.concat([current]);
          } else {
            symb = x.price.slice(0, x.price.indexOf(";") + 1);
            price = parseFloat(
              x.price.slice(x.price.indexOf(";") + 1, x.price.length)
            );
            x.qty++;
            const subtotal = (x.qty * price).toFixed(2);
            x.subtotal = `${symb}${subtotal}`;

            return acc;
          }
        }, []);
        const countTotal = order.reduce((acc, curr) => {
          price = parseFloat(
            curr.subtotal.slice(
              curr.subtotal.indexOf(";") + 1,
              curr.subtotal.length
            )
          );
          return acc + price;
        }, 0);
        const total = `${symbol}${countTotal.toFixed(2)}`;
        return res.render("cart", {
          symbol,
          choices,
          order,
          total,
          first_name,
          last_name,
          address,
          currency: req.query.currency,
        });
      }
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
