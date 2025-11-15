// Professional Multi-Page Portfolio Website - JavaScript Implementation
// Tanzeel Ahmed - Complete functionality for all pages

// 1. Theme System
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.currentTheme = this.getSavedTheme() || this.getSystemPreference();
    this.init();
  }

  getSystemPreference() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  getSavedTheme() {
    return localStorage.getItem("theme-preference");
  }

  saveTheme(theme) {
    localStorage.setItem("theme-preference", theme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.updateToggleIcon(theme);
    this.saveTheme(theme);
  }

  updateToggleIcon(theme) {
    const icon = this.themeToggle.querySelector("i");
    if (theme === "light") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(this.currentTheme);

    // Add rotation animation
    this.themeToggle.style.transform = "rotate(180deg)";
    setTimeout(() => {
      this.themeToggle.style.transform = "rotate(0)";
    }, 300);
  }

  init() {
    this.setTheme(this.currentTheme);

    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }
}

// 2. Typewriter Effect
class Typewriter {
  constructor() {
    this.texts = [
      "Software Engineer",
      "AI Enthusiast",
      "Full-Stack Developer",
      "Problem Solver",
      "Software Innovator",
      "Front-End Developer",
    ];
    this.speed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.typewriterElement = document.getElementById("typewriter");
    this.init();
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];

    if (this.isDeleting) {
      // Deleting text
      this.typewriterElement.textContent = currentText.substring(
        0,
        this.currentCharIndex - 1
      );
      this.currentCharIndex--;

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        setTimeout(() => this.type(), 500);
      } else {
        setTimeout(() => this.type(), this.deleteSpeed);
      }
    } else {
      // Typing text
      this.typewriterElement.textContent = currentText.substring(
        0,
        this.currentCharIndex + 1
      );
      this.currentCharIndex++;

      if (this.currentCharIndex === currentText.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseTime);
      } else {
        setTimeout(() => this.type(), this.speed);
      }
    }
  }

  init() {
    if (this.typewriterElement) {
      setTimeout(() => this.type(), 1000);
    }
  }
}

// 3. Scroll Functionality
class ScrollManager {
  constructor() {
    this.backToTopBtn = document.getElementById("backToTop");
    this.navbar = document.querySelector(".navbar");
    this.init();
  }

  handleScroll() {
    // Back to top button
    if (window.scrollY > 500) {
      this.backToTopBtn.classList.add("show");
    } else {
      this.backToTopBtn.classList.remove("show");
    }

    // Navbar background
    if (window.scrollY > 100) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }

    // Progress bar animation
    this.animateProgressBars();
  }

  animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible && !bar.classList.contains("animated")) {
        const width = bar.getAttribute("data-width");
        bar.style.width = width + "%";
        bar.classList.add("animated");
      }
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  init() {
    // Scroll event listener
    window.addEventListener("scroll", () => this.handleScroll());

    // Back to top button
    if (this.backToTopBtn) {
      this.backToTopBtn.addEventListener("click", () => this.scrollToTop());
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const offset = 80;
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition - offset,
            behavior: "smooth",
          });
        }
      });
    });

    // Initial check
    this.handleScroll();
  }
}

// 4. Form Validation
class FormValidator {
  constructor() {
    this.contactForm = document.getElementById("contactForm");
    this.init();
  }

  validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  validateSubject(subject) {
    return subject.trim().length >= 5;
  }

  validateMessage(message) {
    return message.trim().length >= 10;
  }

  showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "Error");
    const field = document.getElementById(fieldId);

    if (errorElement && field) {
      errorElement.textContent = message;
      field.classList.add("error");
    }
  }

  clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + "Error");
    const field = document.getElementById(fieldId);

    if (errorElement && field) {
      errorElement.textContent = "";
      field.classList.remove("error");
    }
  }

  validateField(fieldId, value) {
    switch (fieldId) {
      case "name":
        if (!this.validateName(value)) {
          this.showError(
            fieldId,
            "Name must be at least 2 characters long and contain only letters"
          );
          return false;
        }
        this.clearError(fieldId);
        return true;

      case "email":
        if (!this.validateEmail(value)) {
          this.showError(fieldId, "Please enter a valid email address");
          return false;
        }
        this.clearError(fieldId);
        return true;

      case "subject":
        if (!this.validateSubject(value)) {
          this.showError(fieldId, "Subject must be at least 5 characters long");
          return false;
        }
        this.clearError(fieldId);
        return true;

      case "message":
        if (!this.validateMessage(value)) {
          this.showError(
            fieldId,
            "Message must be at least 10 characters long"
          );
          return false;
        }
        this.clearError(fieldId);
        return true;

      default:
        return true;
    }
  }

  handleInput(event) {
    const field = event.target;
    this.validateField(field.id, field.value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.contactForm);
    let isValid = true;

    // Validate all fields
    ["name", "email", "subject", "message"].forEach((fieldId) => {
      const value = formData.get(fieldId);
      if (!this.validateField(fieldId, value)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    }
  }

  submitForm() {
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    // Show loading state
    btnText.classList.add("d-none");
    btnLoading.classList.remove("d-none");
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      // Show success modal
      const successModal = new bootstrap.Modal(
        document.getElementById("successModal")
      );
      successModal.show();

      // Reset form and button
      this.contactForm.reset();
      btnText.classList.remove("d-none");
      btnLoading.classList.add("d-none");
      submitBtn.disabled = false;

      // Clear all errors
      ["name", "email", "subject", "message"].forEach((fieldId) => {
        this.clearError(fieldId);
      });
    }, 2000);
  }

  init() {
    if (this.contactForm) {
      // Add input event listeners for real-time validation
      ["name", "email", "subject", "message"].forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field) {
          field.addEventListener("input", (e) => this.handleInput(e));
          field.addEventListener("blur", (e) => this.handleInput(e));
        }
      });

      // Form submission
      this.contactForm.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }
}

// 5. Navigation
class NavigationManager {
  constructor() {
    this.mobileMenu = document.querySelector(".navbar-collapse");
    this.init();
  }

  closeMobileMenu() {
    if (this.mobileMenu && this.mobileMenu.classList.contains("show")) {
      const toggle = document.querySelector(".navbar-toggler");
      if (toggle) {
        toggle.click();
      }
    }
  }

  handleLinkClick(event) {
    // Close mobile menu when a link is clicked
    if (window.innerWidth < 992) {
      this.closeMobileMenu();
    }
  }

  init() {
    // Close mobile menu when clicking on links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => this.handleLinkClick(e));
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.mobileMenu && this.mobileMenu.classList.contains("show")) {
        if (
          !e.target.closest(".navbar") &&
          !e.target.closest(".navbar-toggler")
        ) {
          this.closeMobileMenu();
        }
      }
    });
  }
}

// 6. Utilities
class Utilities {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.classList.add("fade-in");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// 7. Main Application
class PortfolioApp {
  constructor() {
    this.themeManager = new ThemeManager();
    this.typewriter = new Typewriter();
    this.scrollManager = new ScrollManager();
    this.formValidator = new FormValidator();
    this.navigationManager = new NavigationManager();
    this.init();
  }

  initAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: "ease-out-cubic",
      });
    }
  }

  init() {
    // Initialize all components
    this.initAOS();
    Utilities.lazyLoadImages();

    // Add loading class to body for initial page load animation
    document.body.classList.add("loaded");

    console.log("Portfolio website initialized successfully");
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});

// Handle page transitions
window.addEventListener("beforeunload", () => {
  document.body.classList.add("page-transition");
});

// Error handling for images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      console.warn("Image failed to load:", e.target.src);
      // You could set a placeholder image here
      // e.target.src = 'images/placeholder.jpg';
    }
  },
  true
);

// Service Worker Registration (for PWA capabilities - optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => {
    //         console.log('SW registered: ', registration);
    //     })
    //     .catch(registrationError => {
    //         console.log('SW registration failed: ', registrationError);
    //     });
  });
}

// Performance monitoring
window.addEventListener("load", () => {
  // Log performance metrics
  if ("performance" in window) {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  }
});

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ThemeManager,
    Typewriter,
    ScrollManager,
    FormValidator,
    NavigationManager,
    Utilities,
    PortfolioApp,
  };
}
