// Dynamically set --nav-height on body to match #main-nav height
function setNavHeightVar() {
  var nav = document.getElementById("main-nav");
  if (nav) {
    document.body.style.setProperty("--nav-height", nav.offsetHeight + "px");
  }
}

window.addEventListener("DOMContentLoaded", setNavHeightVar);
window.addEventListener("resize", setNavHeightVar);

// Dynamically offset the services-section based on the greater of hero-section or hero-overlay height
function setServicesSectionOffset() {
  var heroSection = document.querySelector(".hero-section");
  var heroOverlay = document.querySelector(".hero-overlay");
  var servicesSection = document.querySelector(".dynamic-offset-section");
  if (heroSection && heroOverlay && servicesSection) {
    // Get the greater of the two heights
    var heroSectionHeight = heroSection.offsetHeight;
    var heroOverlayHeight = heroOverlay.offsetHeight;
    var offset = 40;
    if (heroSectionHeight < heroOverlayHeight) {
      offset = heroOverlayHeight - heroSectionHeight + 40; // 40px for additional spacing
    }
    servicesSection.style.marginTop = offset + "px";
  } else {
    console.log("One or more elements not found:", {
      heroSection,
      heroOverlay,
      servicesSection,
    });
  }
}

window.addEventListener("DOMContentLoaded", setServicesSectionOffset);
window.addEventListener("resize", setServicesSectionOffset);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.offsetTop -
            (document.getElementById("main-nav").offsetHeight || 0), // Adjust for fixed nav height
          behavior: "smooth",
        });
      }
    });
  });

  // Logo click to scroll to top
  document.querySelector(".logo").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Responsive nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Optional: Close menu when clicking a link (for mobile UX)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
      }
    });
  });
});
