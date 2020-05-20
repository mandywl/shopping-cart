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
    const elem = $(".modal#success-modal");
    var instance = M.Modal.getInstance(elem);
    await $.ajax({ url: "/orders", type: "DELETE" });
    instance.open();
  } catch (err) {
    console.log(err);
  }
};
