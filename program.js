(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const programDetails = Array.from(
    document.querySelectorAll(".program-detail"),
  );
  if (!programDetails.length) return;

  programDetails.forEach((detail) => {
    detail.classList.add("program-reveal");
    const content = detail.querySelectorAll(
      ":scope > div:last-child > .tag, :scope > div:last-child > h2, :scope > div:last-child > p, :scope > div:last-child > ul",
    );
    content.forEach((element, index) => {
      element.classList.add("program-copy");
      element.style.setProperty("--reveal-delay", `${(index + 1) * 0.12}s`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
  );

  programDetails.forEach((detail) => observer.observe(detail));
})();
