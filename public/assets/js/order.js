/* eslint-disable no-unused-vars */
const updateOrderButtons = $(".update-order");
const deleteOrderButtons = $(".delete-order");

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

const deleteItem = async (id) => {
  try {
    $(".order-preloader").addClass("active");
    deleteOrderButtons.addClass("disabled");
    updateOrderButtons.addClass("disabled");
    await $.ajax({
      url: `/api/order/${id}`,
      type: "DELETE",
    });
    window.location.reload();
  } catch (err) {
    window.location.replace("/login");
  }
};

async function updateItem(id, operation, num) {
  try {
    deleteOrderButtons.addClass("disabled");
    updateOrderButtons.addClass("disabled");
    $(".order-preloader").addClass("active");
    if (operation === "add") {
      num++;
    } else {
      num--;
    }
    if (num) {
      await $.ajax({
        url: `/api/order/${id}?update=${operation}`,
        type: "PUT",
      });
      window.location.reload();
    } else {
      deleteItem(id);
    }
  } catch (err) {
    window.location.replace("/login");
  }
}

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
