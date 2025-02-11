document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const iframe = document.getElementsByTagName("iframe")[0];

  if (!iframe) {
    return;
  }

  // loading calendar as default
  iframe.src = "calendar.html";

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("href");

      // switching to other pages
      iframe.src = page;
    });
  });
});
