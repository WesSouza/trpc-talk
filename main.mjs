const slides = Array.from(document.querySelectorAll("section.slide"));
const hash = location.hash.substring(1);
let currentSlide =
  slides.find((element) => element.getAttribute("id") === hash) ?? slides[0];

function gotoSlide(index) {
  currentSlide = slides[index];
  currentSlide.scrollIntoView({ behavior: "smooth" });
  history.pushState({}, "", `#${currentSlide.getAttribute("id")}`);
}

function previousSlide() {
  const currentSlideIndex = slides.findIndex(
    (element) => element === currentSlide
  );
  if (currentSlideIndex <= 0) {
    gotoSlide(slides.length - 1);
    return;
  }

  gotoSlide(currentSlideIndex - 1);
}

function nextSlide() {
  const currentSlideIndex = slides.findIndex(
    (element) => element === currentSlide
  );
  if (currentSlideIndex >= slides.length - 1) {
    gotoSlide(0);
    return;
  }

  gotoSlide(currentSlideIndex + 1);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && event.shiftKey) {
    event.preventDefault();
    previousSlide();
    return;
  }

  switch (event.code) {
    case "ArrowLeft":
    case "KeyK":
      event.preventDefault();
      previousSlide();
      break;
    case "ArrowRight":
    case "KeyJ":
    case "Space":
      event.preventDefault();
      nextSlide();
      break;
  }
});
