// ========================================
// STARKIVE — MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------
  // MOBILE MENU
  // ----------------------------------------

  const menuButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuButton.classList.toggle("active");
    });

    // Close menu after clicking a link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuButton.classList.remove("active");
      });
    });
  }


  // ----------------------------------------
  // SMOOTH SCROLL
  // ----------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // ----------------------------------------
  // CURRENT YEAR
  // ----------------------------------------

  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  // ----------------------------------------
  // SCROLL REVEAL
  // ----------------------------------------

  const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .process-card, .why-card"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  // ----------------------------------------
  // CONTACT FORM
  // ----------------------------------------

  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const name =
        document.querySelector("#name")?.value.trim() || "";

      const email =
        document.querySelector("#email")?.value.trim() || "";

      const phone =
        document.querySelector("#phone")?.value.trim() || "";

      const message =
        document.querySelector("#message")?.value.trim() || "";


      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }


      // WhatsApp message
      const whatsappMessage =
        `Hello STARKIVE,%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A%0A` +
        `Message:%0A${encodeURIComponent(message)}`;


      const whatsappURL =
        `https://wa.me/message/YIGOKSBIKPZDF1?text=${whatsappMessage}`;


      // Open WhatsApp
      window.open(whatsappURL, "_blank");

    });

  }


  // ----------------------------------------
  // HEADER SHADOW ON SCROLL
  // ----------------------------------------

  const header = document.querySelector(".header");

  if (header) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    });

  }


  // ----------------------------------------
  // BACK TO TOP
  // ----------------------------------------

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }

    });


    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // ----------------------------------------
  // BUTTON RIPPLE EFFECT
  // ----------------------------------------

  document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function () {

      this.classList.add("clicked");

      setTimeout(() => {
        this.classList.remove("clicked");
      }, 250);

    });

  });

});
