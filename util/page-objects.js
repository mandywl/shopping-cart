/* eslint-disable indent */

const prodMulIn = (currencies, productsIn) => {
  return productsIn.data.map((product) => {
    product.price =
      currencies.symbol + `${(product.price * currencies.rate).toFixed(2)}`;
    return product;
  });
};

module.exports = {
  handleCurrency: (currencies, productsIn) => {
    const products =
      productsIn.data.length > 1
        ? prodMulIn(currencies, productsIn)
        : {
            ...productsIn.data,
            price:
              currencies.symbol +
              `${(productsIn.data.price * currencies.rate).toFixed(2)}`,
          };
    const choices = Object.keys(currencies.list).filter(
      (key) => key !== currencies.currency
    );
    choices.unshift(currencies.currency);
    return { choices, products };
  },

  handlePages: (page, limit, total, categoriesIn, category) => {
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

    return { pages, categories };
  },
};
