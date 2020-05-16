/* eslint-disable camelcase */
const signupUser = async (userData) => {
  try {
    await $.post("/api/signup", userData);
    window.location.replace("/login");
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(function() {
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const firstNameInput = $("input#first-name-input");
  const lastNameInput = $("input#last-name-input");
  const addressInput = $("input#address-input");
  const passwordInput = $("input#password-input");
  const confirmPasswordInput = $("input#confirm-password-input");

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    const confirmPassword = confirmPasswordInput.val().trim();
    const userData = {
      email: emailInput.val().trim(),
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      address: addressInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (
      !userData.email ||
      !userData.password ||
      userData.password !== confirmPassword
    ) {
      return;
    }

    signupUser(userData);
    emailInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    addressInput.val("");
    passwordInput.val("");
    confirmPasswordInput.val("");
  });
});
