(() => {
  const sections = Array.from(document.querySelectorAll(".program-detail"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (
    reducedMotion.matches ||
    !sections.length ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  sections.forEach((section) => {
    const copy = Array.from(section.children).find((child) =>
      child.matches("div"),
    );
    if (!copy) return;

    section.classList.add("program-reveal");
    copy.classList.add("program-copy");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
  );

  sections.forEach((section) => {
    if (section.classList.contains("program-reveal")) {
      observer.observe(section);
    }
  });

  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    sections.forEach((section) => {
      section.classList.add("is-visible");
      observer.unobserve(section);
    });
  });
})();
