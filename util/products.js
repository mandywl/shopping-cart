/* eslint-disable camelcase */
const { Products } = require("../models/models");
const { promisify } = require("util");
const fs = require("fs");
const csvName = "product-list.csv";
const productList = `util/${csvName}`;

const readFileAsync = promisify(fs.readFile);

const checkCSV = async () => {
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
};

fs.watchFile(productList, { interval: 1000 }, () => {
  return checkCSV();
});

module.exports = checkCSV;
