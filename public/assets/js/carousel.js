// CAROUSEL
var slideIndex = 0;

const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

const nextSlide = () => {
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dot-active";
};

nextSlide();

setInterval(() => {
  nextSlide();
}, 5000);
