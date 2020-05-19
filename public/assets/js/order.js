/* eslint-disable no-unused-vars */
const orderItem = async (id, name) => {
  try {
    await $.get(`/api/order/${id}`);
    M.toast({
      html: `${name} added to cart`,
      outDuration: 5000,
      classes: "rounded",
    });
  } catch (err) {
    window.location.replace("/login");
  }
};

const checkout = async () => {
  try {
    await $.ajax({ url: "/orders", type: "DELETE" });
  } catch (err) {
    console.log(err);
  }
};

$("#close").on("click", () => {
  window.location.replace("/orders");
});
