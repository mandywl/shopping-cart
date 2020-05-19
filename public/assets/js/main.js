/* eslint-disable no-unused-vars */
const handleTab = async (cat) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const currency = params.get("currency");
    let url = currency
      ? `?category=${cat}&currency=${currency}`
      : `?category=${cat}`;

    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};
const handlePage = async (num) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const category = params.get("category");
    const currency = params.get("currency");
    let url = category ? `?category=${category}&page=${num}` : `?page=${num}`;
    url = currency ? `${url}&currency=${currency}` : url;
    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};
const handleCurrency = async (currency) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const category = params.get("category");
    const page = params.get("page");

    let url = category
      ? `?category=${category}&currency=${currency}`
      : `?currency=${currency}`;
    url = page ? `${url}&page=${page}` : url;
    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};

function removeLoader() {
  $("#loadingDiv").fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $("#loadingDiv").remove(); //makes page more lightweight
  });
}
$("body").append(
  "<div style='' id='loadingDiv'><div class='loader'>Loading...</div></div>"
);
$(window).on("load", function() {
  setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});
