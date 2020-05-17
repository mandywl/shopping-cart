// eslint-disable-next-line no-unused-vars
const orderItem = async (id) => {
  try {
    await $.get(`/api/order/${id}`);
    console.log("succes!");
    // window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
};
