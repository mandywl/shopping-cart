// eslint-disable-next-line no-unused-vars
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
