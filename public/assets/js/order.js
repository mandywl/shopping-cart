// eslint-disable-next-line no-unused-vars
const orderItem = async (id) => {
  try {
    await $.get(`/api/order/${id}`);
    M.toast({
      html: "Item added to cart",
      outDuration: 5000,
      classes: "rounded",
    });
  } catch (err) {
    window.location.replace("/login");
  }
};
