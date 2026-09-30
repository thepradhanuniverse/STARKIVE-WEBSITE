// ================= MOBILE MENU =================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}


// ================= ENQUIRY FORM =================

const enquiryForm = document.getElementById("enquiryForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");
const whatsappAfter = document.getElementById("whatsappAfter");
const whatsappEnquiry = document.getElementById("whatsappEnquiry");


if (enquiryForm) {

  enquiryForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();


    if (!name || !email || !service || !message) {

      formStatus.textContent =
        "Please fill in all required fields.";

      formStatus.className =
        "form-status error";

      return;
    }


    submitButton.disabled = true;

    submitButton.textContent =
      "Sending...";


    formStatus.textContent = "";

    formStatus.className =
      "form-status";


    try {

      const response = await fetch(
        "https://starkive-backend.onrender.com/api/inquiry",
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


      const data = await response.json();


      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send enquiry."
        );
      }


      formStatus.textContent =
        "✓ Enquiry sent successfully! We will get back to you soon.";

      formStatus.className =
        "form-status success";


      // ================= WHATSAPP =================

      const whatsappMessage =
        `Hello STARKIVE,

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service}

Message:
${message}`;


      const whatsappURL =
        "https://wa.me/message/YIGOKSBIKPZDF1" +
        "?text=" +
        encodeURIComponent(whatsappMessage);


      if (whatsappEnquiry) {

        whatsappEnquiry.href =
          whatsappURL;

      }


      if (whatsappAfter) {

        whatsappAfter.style.display =
          "block";

      }


      enquiryForm.reset();


    } catch (error) {

      console.error(
        "Enquiry error:",
        error
      );


      formStatus.textContent =
        "✕ Unable to send enquiry right now. Please try again.";

      formStatus.className =
        "form-status error";

    }


    submitButton.disabled = false;

    submitButton.textContent =
      "Send Enquiry →";

  });

}
