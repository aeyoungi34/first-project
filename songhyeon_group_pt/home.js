(() => {
  const carousel = document.querySelector(".home-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".home-carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".home-carousel__slide"));
  const dots = Array.from(carousel.querySelectorAll(".home-carousel__dot"));
  const previous = carousel.querySelector(".home-carousel__arrow--prev");
  const next = carousel.querySelector(".home-carousel__arrow--next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let timer;
  let paused = false;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", String(active));
    });
  };

  const stopTimer = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  const startTimer = () => {
    stopTimer();
    if (!paused && !reducedMotion.matches) {
      timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
    }
  };

  previous.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startTimer();
  });
  next.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startTimer();
  });
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startTimer();
    });
  });

  carousel.addEventListener("pointerenter", () => {
    paused = true;
    stopTimer();
  });
  carousel.addEventListener("pointerleave", () => {
    paused = false;
    startTimer();
  });
  carousel.addEventListener("focusin", () => {
    paused = true;
    stopTimer();
  });
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      paused = false;
      startTimer();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });
  reducedMotion.addEventListener("change", startTimer);

  showSlide(0);
  startTimer();
})();
