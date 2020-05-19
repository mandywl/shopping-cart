const axios = require("axios");
const currency = require("./currency.json");

module.exports = {
  getCurrency: async (req, res) => {
    try {
      const curr = req.query.currency || "USD";
      const results = await axios({
        method: "get",
        baseURL: "https://v6.exchangerate-api.com/v6/",
        url: `${process.env.EXCHANGE_API_KEY}/latest/USD`,
        timeout: 1000,
      });
      const rates = results.data.conversion_rates;

      return res.json({
        currency: curr,
        symbol: currency[curr],
        rate: rates[curr],
        list: rates,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
