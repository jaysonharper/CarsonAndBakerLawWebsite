// --- Vibrate phone icon every 10 seconds ---
document.addEventListener("DOMContentLoaded", function () {
  const phoneIcons = document.querySelectorAll(".call-button .phone-icon");
  if (phoneIcons.length > 0) {
    setInterval(() => {
      phoneIcons.forEach((icon) => {
        icon.classList.remove("vibrate-temp"); // Remove if present
        // Force reflow to restart animation
        void icon.offsetWidth;
        icon.classList.add("vibrate-temp");
        setTimeout(() => icon.classList.remove("vibrate-temp"), 400); // Match vibrate animation duration
      });
    }, 5000);
  }
});

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

  // Modal: show service details when a service card is clicked
  const modalOverlay = document.getElementById("service-modal");
  const modal = modalOverlay ? modalOverlay.querySelector(".modal") : null;
  const modalTitle = document.getElementById("service-modal-title");
  const modalDesc = document.getElementById("service-modal-desc");
  const modalClose = document.getElementById("service-modal-close");

  let lastFocusedElement = null;

  function openModal(title, desc, isHTML = false) {
    if (!modalOverlay) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = title;
    if (isHTML) {
      modalDesc.innerHTML = desc;
    } else {
      modalDesc.textContent = desc;
    }
    modalOverlay.setAttribute("aria-hidden", "false");
    // prevent background scrolling
    document.body.style.overflow = "hidden";
    // move focus into modal
    modalClose.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
    if (
      lastFocusedElement &&
      lastFocusedElement.classList &&
      lastFocusedElement.classList.contains("service-card")
    ) {
      lastFocusedElement.setAttribute("aria-expanded", "false");
    }
  }

  // Attach click handlers to service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    // make interactive for assistive tech
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-expanded", "false");

    card.addEventListener("click", () => {
      const h3 = card.querySelector("h3");
      const p = card.querySelector("p");
      const rawTitle = h3 ? h3.textContent.trim() : "Service";

      // Special override for Estate Planning
      if (rawTitle.toLowerCase() === "estate & tax planning") {
        const title = "Estate and Tax Planning";
        const descHTML = `
          <p>Our goal at Carson & Baker in estate planning is to listen to you and help you to carry out your wishes, and to help to maximize the money/assets your beneficiaries receive after you are gone, without paying unnecessary taxes, costs, and fees. You can start estate planning at any age, but your (or your heirs’) maximum flexibility will occur the sooner you consult us. There are various methods at our disposal to ensure your assets are effectively allocated, yet accessible by your beneficiaries upon your death. We specialize in estate planning services as detailed below.</p>
          <ul>
            <li><strong>Wills</strong> – Wills provide legal instructions on how you want your estate distributed among your beneficiaries upon your death.</li>
            <li><strong>Trusts</strong> - Like wills, trusts give legal instructions on how you want your estate distributed among your beneficiaries upon your death, but also contain instructions for providing for your own care in the event of your disability. Trusts can be an effective tool for transferring assets upon death without court intervention.</li>
            <li><strong>Estate administration</strong> - We work closely with your heirs and beneficiaries to see that the terms of your will or trust are carried out as you intended. Depending on the circumstances, this can be done through probate administration or non-judicial trust administration, and, in some cases, through informal agreement of beneficiaries.</li>
            <li><strong>Estate tax/inheritance tax planning</strong> - Establishing the appropriate asset distribution and allocation to minimize the overall tax to be paid by your estate beneficiaries.</li>
          </ul>
        `;
        openModal(title, descHTML, true);
        card.setAttribute("aria-expanded", "true");
        return;
      }

      // Special override for Elder Law
      if (rawTitle.toLowerCase() === "elder law") {
        const title = rawTitle; // keep default title
        const descHTML = `
          <p>Getting old is relatively simple. The laws and decisions are not. Casteel &amp; Carson will guide you through the maze of difficult decisions involving retirement, estate and tax planning, and long-term care planning. We assist our clients with legal and tax issues involved in Medicare coverage, nursing-home care, in-home care, powers of attorney, medical directives, and other legal matters. Some aspects to consider are:</p>
          <ul>
            <li><strong>Medicaid planning</strong> - State-government-run, this federal program provides health care for individuals with low-income. This planning can be quite complex as the rules for eligibility change from year-to-year. To make sure you are receiving the benefits you are entitled to, please consult with Casteel &amp; Carson on your current situation and any changes that can be made to improve your benefits.</li>
            <li><strong>Elder abuse</strong> – typically occurs in nursing homes or assisted living facilities by unskilled or poorly paid staff. Without closely followed procedures or documented inspections, significant harm or even death may happen to clients. Casteel &amp; Carson will take the appropriate legal actions to ensure fair compensation for all violations and can assist in making recommendations on whether facilities provide the right care for your loved ones.</li>
          </ul>
        `;
        openModal(title, descHTML, true);
        card.setAttribute("aria-expanded", "true");
        return;
      }

      // Special override for Personal Injury
      if (rawTitle.toLowerCase() === "personal injury") {
        const title = rawTitle; // use default title
        const descHTML = `
          <p>Personal Injury cases are always traumatic. Whether the injury is minor, severe or results in death, the victim(s) suffers some level of emotional distress beyond the actual injury. Casteel &amp; Carson ensure that you as the victim or family of the victim get proper compensation from the party responsible for the injury.</p>
          <ul>
            <li><strong>Auto accidents</strong> – The responsible party’s insurance company will always try to settle a claim for the minimal amount. Our responsibility is to make sure the amount determined is fair and will cover all damages and expenses, including aspects such as rental cars until your vehicle has been fully repaired or replaced, medical expenses, lost wages, etc. Keep in mind, it may make more sense to just brush off a minor accident if there is minimal damage and no injuries. The process may be more complex than the severity warrants.</li>
            <li><strong>Wrongful death or accident</strong> – Death or injury may be due to negligence or even intentional. In a wrongful death or accident claim, Casteel &amp; Carson will make sure all appropriate damages are compensated for. Another reason to follow-up on a case would be to prevent it from happening to more people later on. Damages may include:
              <ul>
                <li>Medical, hospital, funeral and burial expenses;</li>
                <li>Compensation for the decedent's pain and suffering, during any period of consciousness between the time of injury and death;</li>
                <li>Losses suffered by the decedent's spouse, children, or next of kin, including:
                  <ul>
                    <li>loss of financial support</li>
                    <li>loss of service</li>
                    <li>loss of gifts or other valuable gratuities</li>
                    <li>loss of parental training and guidance</li>
                    <li>loss of society and companionship</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><strong>Negligence</strong> – typically, negligence is an act or behavior unintentional in consequence that causes you damage. It can be carelessness in one's actions, such that the person responsible is not exercising the standards of care required of a person driving a car, for example. The services provided by Casteel &amp; Carson ensure that you receive maximal compensation for the damages you suffered.</li>
          </ul>
        `;
        openModal(title, descHTML, true);
        card.setAttribute("aria-expanded", "true");
        return;
      }

      // Special override for Business Law
      if (rawTitle.toLowerCase() === "business law") {
        const title = rawTitle; // keep default title
        const descHTML = `
          <ul>
            <li><strong>Business transactions</strong> – all forms of transactions between two businesses should be documented as completely as possible to protect both parties and to clearly spell out the agreement.</li>
            <li><strong>New entity/business formation (Corporation, LLC, Partnership)</strong> – let Casteel &amp; Carson advise which type of entity will protect your assets and minimize your liabilities based on the form of business chosen. With our experience and insight, you will be able to conduct your business with full confidence and focus on maximizing growth of your business.</li>
            <li><strong>Commercial collections</strong> – we can handle all commercial collections and enforce your business agreements.</li>
          </ul>
        `;
        openModal(title, descHTML, true);
        card.setAttribute("aria-expanded", "true");
        return;
      }

      // Special override for Real Estate
      if (rawTitle.toLowerCase() === "real estate") {
        const title = "Real Estate Law";
        const descHTML = `
          <p>It is always prudent to use a lawyer in all aspects of a real estate transaction to ensure facets are covered. See us before you sign any papers to sell or buy property. By including key terms and provisions early on in the process in your earnest money agreement or contract, you ensure your interests are protected, and handled in a timely manner. A broker may be familiar with the procedures, but a lawyer with the experience of Casteel &amp; Carson will make sure the transaction is to your benefit. Specific legal actions we specialize in are:</p>
          <ul>
            <li><strong>Residential / Commercial sales</strong> – we can handle all aspects of these transactions, both for the buyer or the seller.</li>
            <li><strong>Document preparation</strong> – in all real estate deals, it is critical that the transaction be documented as thoroughly as possible to protect both parties’ interests.</li>
            <li><strong>Foreclosures</strong> – foreclosures can be a long complex process if the provisions are not properly documented and followed. With Casteel &amp; Carson, we make sure that all conditions are enforced and followed to minimize the time before the property is available for you to re-lease or resell.</li>
          </ul>
        `;
        openModal(title, descHTML, true);
        card.setAttribute("aria-expanded", "true");
        return;
      }

      const title = rawTitle;
      const desc = p ? p.textContent.trim() : "Detailed description forthcoming.";
      openModal(title, desc);
      card.setAttribute("aria-expanded", "true");
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Close modal behaviors
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal(); // click on backdrop
    });
  }

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalOverlay && modalOverlay.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    }
  });
});
