const { Users, Products } = require("../../models/models");

module.exports = {
  getApi: async function(req, res) {
    try {
      result = await Products.findAll();
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }
  },
  getProductData: async function(req, res) {
    try {
      const id = req.body.id;
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
      const { email, password } = req.body;
      await Users.create({
        email,
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
      return res.status(401).json({ error: err.code });
    }
  },
};
