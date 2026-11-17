(() => {
  const gallery = document.querySelector(".gallery-grid");
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll(":scope > .gallery-item"));
  if (!items.length) return;

  const track = document.createElement("div");
  track.className = "gallery-track";

  const group = document.createElement("div");
  group.className = "gallery-track__group";
  items.forEach((item) => group.appendChild(item));

  const clone = group.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.append(group, clone);
  gallery.appendChild(track);
  gallery.classList.add("is-carousel");

  const updateDimensions = () => {
    const firstItem = group.querySelector(".gallery-item");
    const distance = group.getBoundingClientRect().width;
    const start = (gallery.clientWidth - firstItem.getBoundingClientRect().width) / 2;

    track.style.setProperty("--gallery-start", `${start}px`);
    track.style.setProperty("--gallery-distance", `${distance}px`);
    track.style.setProperty("--gallery-duration", `${distance / 35}s`);
  };

  track.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("pointerenter", () => {
      gallery.classList.add("is-paused");
    });
    item.addEventListener("pointerleave", () => {
      gallery.classList.remove("is-paused");
    });
  });

  updateDimensions();
  window.addEventListener("resize", updateDimensions, { passive: true });
})();
