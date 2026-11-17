// EmailJS 설정
const SERVICE_ID = "여기에_Service_ID";
const TEMPLATE_ID = "여기에_Template_ID";
const PUBLIC_KEY = "여기에_Public_Key";

// EmailJS 초기화
emailjs.init({
  publicKey: PUBLIC_KEY,
});

// 상담 신청 폼
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const result = document.getElementById("form-result");

  submitBtn.disabled = true;
  submitBtn.textContent = "전송 중...";

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);

    result.textContent = "상담 신청이 정상적으로 접수되었습니다.";
    result.style.color = "green";

    contactForm.reset();
  } catch (error) {
    console.error("EmailJS 오류:", error);

    result.textContent = "전송에 실패했습니다. 다시 시도해 주세요.";
    result.style.color = "red";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "상담 신청하기";
  }
});
