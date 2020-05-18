/* eslint-disable no-unused-vars */
const handleTab = async (cat) => {
  try {
    window.location.replace(`/?category=${cat}`);
  } catch (err) {
    console.log(err);
  }
};
const handlePage = async (num) => {
  try {
    let params = new URLSearchParams(window.location.search.slice(1));
    const category = params.get("category");
    const url = category ? `?category=${category}&page=${num}` : `?page=${num}`;
    // console.log(document.location.searchParams.get("category"));
    window.location.replace(url);
  } catch (err) {
    console.log(err);
  }
};
