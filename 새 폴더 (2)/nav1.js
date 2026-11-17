// 공통 네비게이션: 각 HTML의 <div id="site-nav"></div> 위치에 메뉴를 삽입합니다.
document.addEventListener("DOMContentLoaded", function () {
  const navMount = document.getElementById("site-nav");
  if (!navMount) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const links = menuItems
    .map(function (item) {
      const active = currentPage === item[0] ? ' aria-current="page"' : "";
      return `<a href="${item[0]}"${active}>${item[1]}</a>`;
    })
    .join("");

  navMount.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="logo" href="index.html" aria-label="송현 홈">
          <i class="logo-mark"></i><span>송현</span> GROUP PT
        </a>
        <nav class="nav" aria-label="주 메뉴">${links}</nav>
        <a class="nav-cta" href="contact.html">무료 상담 신청 ↗</a>
      </div>
    </header>
  `;
});
