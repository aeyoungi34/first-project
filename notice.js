document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("noticePopup");
  const closeBtn = document.getElementById("noticeClose");
  const confirmBtn = document.getElementById("noticeConfirm");

  if (!popup) return;

  const closePopup = () => {
    popup.style.display = "none";
  };

  closeBtn.addEventListener("click", closePopup);
  confirmBtn.addEventListener("click", closePopup);
});
