document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const iframe = document.getElementById("content-frame");

  // Load calendar.html by default
  iframe.src = "calendar.html";

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("href");

      // Change iframe src to the clicked page
      iframe.src = page;
    });
  });
});
