const { Products } = require("../../models/models");

module.exports = {
  getApi: async function(req, res) {
    try {
      result = await Products.findall();
      res.json({ ...result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
