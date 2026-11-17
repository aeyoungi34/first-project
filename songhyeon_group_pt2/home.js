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

(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const main = document.querySelector("main");
  if (!main) return;

  const sectionByEyebrow = (label) =>
    Array.from(main.querySelectorAll(".section")).find((section) => {
      const eyebrow = section.querySelector(".eyebrow");
      return eyebrow && eyebrow.textContent.trim() === label;
    });

  const revealTargets = [];
  const addTargets = (elements, className, stagger = 0) => {
    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal", className);
      if (stagger) {
        element.style.setProperty("--reveal-delay", `${index * stagger}s`);
      }
      revealTargets.push(element);
    });
  };

  const whySection = sectionByEyebrow("WHY GROUP PT");
  if (whySection) {
    const copy = whySection.querySelector(".split > div:first-child");
    const photo = whySection.querySelector(".hero-photo-stack");
    if (copy) {
      addTargets(
        Array.from(copy.querySelectorAll(".eyebrow, h2, p, .check-list")),
        "scroll-reveal--up",
        0.18,
      );
    }
    if (photo) addTargets([photo], "scroll-reveal--image");
  }

  const programSection = sectionByEyebrow("OUR PROGRAM");
  if (programSection) {
    const heading = programSection.querySelector(".section-heading");
    const cards = Array.from(programSection.querySelectorAll(".program-card"));
    if (heading) {
      addTargets(
        Array.from(heading.querySelectorAll(".eyebrow, h2, p")),
        "scroll-reveal--up",
        0.18,
      );
    }
    addTargets(cards, "scroll-reveal--up", 0.2);
  }

  const firstStepSection = sectionByEyebrow("YOUR FIRST STEP");
  if (firstStepSection) {
    const copy = firstStepSection.querySelector(".split > div:first-child");
    const stats = Array.from(firstStepSection.querySelectorAll(".stats > div"));
    if (copy) {
      addTargets(
        Array.from(copy.querySelectorAll(".eyebrow, h2, p, .btn")),
        "scroll-reveal--up",
        0.18,
      );
    }
    addTargets(stats, "scroll-reveal--right", 0.2);
  }

  const cta = main.querySelector(".cta-band");
  if (cta) {
    const content = cta.querySelector(".inner");
    if (content) {
      addTargets(
        Array.from(content.querySelectorAll("h2, p, .btn")),
        "scroll-reveal--up",
        0.2,
      );
    }
  }

  if (!revealTargets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.addEventListener("transitionend", (event) => {
          if (event.propertyName === "opacity") {
            entry.target.style.removeProperty("--reveal-delay");
          }
        });
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -8% 0px" },
  );
  revealTargets.forEach((target) => observer.observe(target));

  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    revealTargets.forEach((target) => {
      target.style.removeProperty("--reveal-delay");
      target.classList.add("is-visible");
      observer.unobserve(target);
    });
  });
})();
