// Code adapted from Matthew Croak's 100% amazing blog post (https://medium.com/better-programming/make-a-slideshow-with-automatic-and-manual-controls-using-html-css-and-javascript-b7e9305168f9)

var slideIndex = 1;
var timer;

function showSlides(slideNum, incrementNum) {
  clearTimeout(timer);
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (slideNum != 0) {
    slideIndex = slideNum + incrementNum;
  } else {
    slideIndex += incrementNum;
  }

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  if (slideIndex < 1) { 
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

  timer = setTimeout(nextSlide,4000);
  
}

function nextSlide(){
  showSlides(slideIndex,1)
};

window.addEventListener("load",function() {
  showSlides(slideIndex, 0);
  timer = setTimeout(nextSlide,4000);
})