// ========================================
// STARKIVE — MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------
  // MOBILE MENU
  // ----------------------------------------

  const menuButton = document.querySelector("#menuButton");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      menuButton.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
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

  const yearElements =
    document.querySelectorAll(".current-year");

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
  // STARKIVE ENQUIRY FORM
  // ----------------------------------------

  const enquiryForm =
    document.querySelector("#enquiryForm");

  const submitButton =
    document.querySelector("#submitButton");

  const formStatus =
    document.querySelector("#formStatus");

  const whatsappAfter =
    document.querySelector("#whatsappAfter");

  const whatsappEnquiry =
    document.querySelector("#whatsappEnquiry");


  if (enquiryForm) {

    enquiryForm.addEventListener("submit", async function (e) {

      e.preventDefault();


      const name =
        document.querySelector("#name")?.value.trim() || "";

      const email =
        document.querySelector("#email")?.value.trim() || "";

      const phone =
        document.querySelector("#phone")?.value.trim() || "";

      const service =
        document.querySelector("#service")?.value || "";

      const message =
        document.querySelector("#message")?.value.trim() || "";


      // Required fields

      if (!name || !email || !service || !message) {

        formStatus.textContent =
          "Please fill in all required fields.";

        formStatus.className =
          "form-status error";

        return;

      }


      // Loading state

      submitButton.disabled = true;

      submitButton.textContent =
        "Sending...";

      formStatus.textContent = "";

      formStatus.className =
        "form-status";

      whatsappAfter.style.display =
        "none";


      try {

        /*
          LOCAL BACKEND TEST

          server.js route:
          POST /api/inquiry
        */

        const response = await fetch(
          "http://localhost:5000/api/inquiry",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({

              name: name,

              email: email,

              phone: phone,

              service: service,

              message: message

            })
          }
        );


        const result =
          await response.json();


        if (!response.ok || !result.success) {

          throw new Error(
            result.message ||
            "Failed to send enquiry."
          );

        }


        // Success

        formStatus.textContent =
          "✅ Enquiry sent successfully! We will contact you soon.";

        formStatus.className =
          "form-status success";


        submitButton.textContent =
          "Enquiry Sent ✓";


        // --------------------------------
        // WHATSAPP MESSAGE
        // --------------------------------

        const whatsappMessage =
`Hello STARKIVE,

I just submitted an enquiry through your website.

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service}

Message:
${message}`;


        whatsappEnquiry.href =
          "https://wa.me/message/YIGOKSBIKPZDF1?text=" +
          encodeURIComponent(whatsappMessage);


        whatsappAfter.style.display =
          "block";


        // Clear form

        enquiryForm.reset();


      } catch (error) {

        console.error(
          "STARKIVE Enquiry Error:",
          error
        );


        formStatus.textContent =
          "❌ Unable to send enquiry right now. Please try again.";

        formStatus.className =
          "form-status error";


        submitButton.disabled =
          false;

        submitButton.textContent =
          "Send Enquiry →";

      }

    });

  }


  // ----------------------------------------
  // HEADER SHADOW ON SCROLL
  // ----------------------------------------

  const header =
    document.querySelector(".header");

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

  const backToTop =
    document.querySelector(".back-to-top");

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
