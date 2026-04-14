document.addEventListener("DOMContentLoaded", function () {
  // زر شاهد الفيديو
  const watchVideoBtn = document.getElementById("watchVideoBtn");
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const videoSection = document.getElementById("video");
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // عداد السيكشن
  const section = document.getElementById("statsSection");
  if (!section) return;

  const numbers = section.querySelectorAll(".stat-number");
  if (!numbers.length) return;

  let started = false;

  function formatValue(value, format) {
    if (format === "k_plus") return Math.round(value / 1000) + "K+";
    if (format === "usd_k") return "$" + Math.round(value / 1000) + "K";
    if (format === "m_plus_1") {
      const m = (value / 1000000).toFixed(1).replace(".0", "");
      return m + "M+";
    }
    return String(Math.round(value));
  }

  function animateNumber(el, target, format, duration) {
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = formatValue(current, format);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatValue(target, format);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          numbers.forEach(function (el) {
            const target = Number(el.getAttribute("data-target")) || 0;
            const format = el.getAttribute("data-format") || "";
            animateNumber(el, target, format, 1600);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
});



const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fields = contactForm.querySelectorAll("input[required]");

  function setFieldError(input, message) {
    const field = input.closest(".field");
    const msg = field.querySelector(".error-msg");
    field.classList.add("has-error");
    msg.textContent = message;
  }

  function clearFieldError(input) {
    const field = input.closest(".field");
    const msg = field.querySelector(".error-msg");
    field.classList.remove("has-error");
    msg.textContent = "";
  }

  fields.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") clearFieldError(input);
    });
  });

  contactForm.addEventListener("submit", (e) => {
    let hasError = false;

    fields.forEach((input) => {
      if (input.value.trim() === "") {
        setFieldError(input, "لازم الحقل يكون ممتلئ");
        hasError = true;
      } else {
        clearFieldError(input);
      }
    });

    if (hasError) {
      e.preventDefault();
      alert("لازم الحقل يكون ممتلئ");
    }
  });
}

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});
