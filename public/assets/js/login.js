const loginForm = $("form.login");
const emailInput = $("input#email-input");
const passwordInput = $("input#password-input");

const loginUser = async (userData) => {
  try {
    await $.post("/api/login", userData);
    emailInput.val("");
    passwordInput.val("");
    window.location.replace("/");
  } catch (err) {
    $(".login-error").show();
    passwordInput.val("");
  }
};

$(document).ready(function() {
  loginForm.on("submit", function(event) {
    event.preventDefault();

    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData);
  });
});
