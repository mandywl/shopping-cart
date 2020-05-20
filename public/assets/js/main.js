/* eslint-disable no-unused-vars */
const handleTab = async (cat) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const currency = params.get("currency") || localStorage.getItem("currency");
    let url = currency
      ? `/?category=${cat}&currency=${currency}`
      : `/?category=${cat}`;

    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};
const handlePage = async (num) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const category = params.get("category");
    const currency = params.get("currency") || localStorage.getItem("currency");
    let url = category ? `/?category=${category}&page=${num}` : `/?page=${num}`;
    url = currency ? `${url}&currency=${currency}` : url;
    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};
const handleCurrency = async (currency) => {
  try {
    localStorage.setItem("currency", currency);
    let params = new URLSearchParams(window.location.search.slice(1));
    const category = params.get("category");
    const page = params.get("page");

    let url = category
      ? `/?category=${category}&currency=${currency}`
      : `/?currency=${currency}`;
    url = page ? `${url}&page=${page}` : url;
    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};

const handleProduct = async (id) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const currency = params.get("currency") || localStorage.getItem("currency");
    const baseUrl = `/product/${id}`;
    const url = currency ? `${baseUrl}?currency=${currency}` : baseURl;
    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(function() {
  const elem = $(".carousel");
  var instance = M.Carousel.getInstance(elem);
  setInterval(() => {
    instance.next();
  }, 5000);
});
