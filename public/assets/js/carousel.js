$(document).ready(function() {
  const elem = $(".carousel");
  var instance = M.Carousel.getInstance(elem);
  setInterval(() => {
    instance.next();
  }, 5000);
});
