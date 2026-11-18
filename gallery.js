document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".gallery-track");
  const container = document.querySelector(".gallery-container");

  container.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  container.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });

  // Lightbox functionality
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-backdrop" aria-hidden="true"></div>
    <button class="lightbox-close" aria-label="닫기" type="button">
      <span aria-hidden="true">×</span>
    </button>
    <button class="lightbox-prev" aria-label="이전 이미지" type="button">
      <span aria-hidden="true">‹</span>
    </button>
    <button class="lightbox-next" aria-label="다음 이미지" type="button">
      <span aria-hidden="true">›</span>
    </button>
    <img class="lightbox-image" src="" alt="" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxBackdrop = lightbox.querySelector(".lightbox-backdrop");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrev = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");

  const galleryImages = Array.from(
    document.querySelectorAll(".gallery-group img"),
  );
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const img = galleryImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || `갤러리 이미지 ${currentIndex + 1}`;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    lightboxImage.src = "";
  };

  const showPrev = () => {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || `갤러리 이미지 ${currentIndex + 1}`;
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    const img = galleryImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || `갤러리 이미지 ${currentIndex + 1}`;
  };

  galleryImages.forEach((img, index) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(index));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
    img.setAttribute("tabindex", "0");
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrev);
  lightboxNext.addEventListener("click", showNext);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
});
