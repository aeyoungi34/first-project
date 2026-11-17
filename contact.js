// ===================================
// EmailJS 설정
// ===================================

const SERVICE_ID = "service1";
const TEMPLATE_ID = "songhyeon1";
const PUBLIC_KEY = "62T5FAFbXtEhr5d2W";

// EmailJS 초기화
emailjs.init({
  publicKey: PUBLIC_KEY,
});

// 상담 신청 폼
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    const result = document.getElementById("form-result");

    submitBtn.disabled = true;
    submitBtn.textContent = "전송 중...";

    try {
      const response = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm,
      );

      console.log("전송 성공:", response);

      result.textContent = "상담 신청이 정상적으로 접수되었습니다.";
      result.style.color = "green";

      contactForm.reset();
    } catch (error) {
      console.error("EmailJS 오류:", error);

      result.textContent = "전송 실패: " + (error.text || error.message);
      result.style.color = "red";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "상담 신청하기";
    }
  });
}
