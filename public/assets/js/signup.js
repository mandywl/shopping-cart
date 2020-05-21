/* eslint-disable camelcase */
const addressInput = $("input#address-input");
const signUpForm = $("form.signup");
const signupEmailInput = $("input#email-input");
const firstNameInput = $("input#first-name-input");
const lastNameInput = $("input#last-name-input");
const signupPasswordInput = $("input#password-input");
const confirmPasswordInput = $("input#confirm-password-input");

const signupUser = async (userData) => {
  try {
    await $.post("/api/signup", userData);
    signupEmailInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    addressInput.val("");
    signupPasswordInput.val("");
    confirmPasswordInput.val("");
    addressInput.attr("placeholder", "").blur();
    window.location.replace("/login");
  } catch (err) {
    $(".login-error").show();
  }
};

$(document).ready(function() {
  addressInput.attr("placeholder", "").blur();

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    const confirmPassword = confirmPasswordInput.val().trim();
    const userData = {
      email: signupEmailInput.val().trim(),
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      address: addressInput.val().trim(),
      password: signupPasswordInput.val().trim(),
    };

    if (
      !userData.email ||
      !userData.password ||
      userData.password !== confirmPassword
    ) {
      return;
    }

    signupUser(userData);
  });
});
