const locationCarousel = document.querySelector(".location-carousel");
const carouselPrevButton = document.querySelector(".carousel-button-prev");
const carouselNextButton = document.querySelector(".carousel-button-next");

if (locationCarousel && carouselPrevButton && carouselNextButton) {
  const getScrollAmount = () => {
    const firstCard = locationCarousel.querySelector(".location-card");
    if (!firstCard) return locationCarousel.clientWidth;

    const styles = window.getComputedStyle(locationCarousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  carouselPrevButton.addEventListener("click", () => {
    locationCarousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

  carouselNextButton.addEventListener("click", () => {
    locationCarousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });
}

const joinForm = document.querySelector("#join-form");

if (joinForm) {
  const firstNameInput = joinForm.querySelector("#first-name");
  const lastNameInput = joinForm.querySelector("#last-name");
  const emailInput = joinForm.querySelector("#join-email");
  const passwordInput = joinForm.querySelector("#join-password");
  const productInput = joinForm.querySelector("#product-choice");
  const passwordToggle = joinForm.querySelector(".password-toggle");
  const formMessage = joinForm.querySelector("#join-form-message");

  const setFieldError = (input, message) => {
    const field = input.closest(".form-field");
    const error = field ? field.querySelector(".field-error") : null;
    if (!field || !error) return;

    field.classList.toggle("is-invalid", Boolean(message));
    error.textContent = message;
  };

  const validateName = (input, label) => {
    const value = input.value.trim();

    if (!value) {
      setFieldError(input, `${label} is required.`);
      return false;
    }

    if (value.length < 2) {
      setFieldError(input, `${label} must be at least 2 characters.`);
      return false;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      setFieldError(input, `${label} can only use letters.`);
      return false;
    }

    setFieldError(input, "");
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!value) {
      setFieldError(emailInput, "Email address is required.");
      return false;
    }

    if (!isValid) {
      setFieldError(emailInput, "Use a valid email address.");
      return false;
    }

    setFieldError(emailInput, "");
    return true;
  };

  const validatePassword = () => {
    const value = passwordInput.value;

    if (!value) {
      setFieldError(passwordInput, "Password is required.");
      return false;
    }

    if (value.length < 8) {
      setFieldError(passwordInput, "Password must be at least 8 characters.");
      return false;
    }

    if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
      setFieldError(passwordInput, "Use letters and at least one number.");
      return false;
    }

    setFieldError(passwordInput, "");
    return true;
  };

  const validateProduct = () => {
    if (!productInput.value) {
      setFieldError(productInput, "Choose one product menu.");
      return false;
    }

    setFieldError(productInput, "");
    return true;
  };

  const validateForm = () => {
    const checks = [];

    if (firstNameInput) {
      checks.push(validateName(firstNameInput, "First name"));
    }

    if (lastNameInput) {
      checks.push(validateName(lastNameInput, "Last name"));
    }

    if (emailInput) {
      checks.push(validateEmail());
    }

    if (passwordInput) {
      checks.push(validatePassword());
    }

    if (productInput) {
      checks.push(validateProduct());
    }

    return checks.every(Boolean);
  };

  if (firstNameInput) {
    firstNameInput.addEventListener("input", () =>
      validateName(firstNameInput, "First name"),
    );
  }

  if (lastNameInput) {
    lastNameInput.addEventListener("input", () =>
      validateName(lastNameInput, "Last name"),
    );
  }

  if (emailInput) {
    emailInput.addEventListener("input", validateEmail);
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", validatePassword);
  }

  if (productInput) {
    productInput.addEventListener("change", validateProduct);
  }

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const shouldShow = passwordInput.type === "password";
      passwordInput.type = shouldShow ? "text" : "password";
      passwordToggle.setAttribute(
        "aria-label",
        shouldShow ? "Hide password" : "Show password",
      );
    });
  }

  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";

    if (!validateForm()) {
      formMessage.textContent = "Please fix the highlighted fields first.";
      return;
    }

    formMessage.textContent = "Success. Redirecting to MixWich...";
    window.location.href = "home.html";
  });
}
