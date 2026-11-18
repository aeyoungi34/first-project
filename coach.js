document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".coach-photo").forEach((img) => {
    img.addEventListener("click", () => {
      img.classList.add("is-clicked");
      img.addEventListener(
        "transitionend",
        () => img.classList.remove("is-clicked"),
        { once: true },
      );
    });
  });
});
