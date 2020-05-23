const loginForm = $("form.login");
const emailInput = $("input#email-input");
const passwordInput = $("input#password-input");

const loginUser = async (userData) => {
  try {
    $(".login-preloader").addClass("active");
    await $.post("/api/login", userData);
    emailInput.attr("disabled");
    passwordInput.attr("disabled");
    window.location.replace("/");
  } catch (err) {
    emailInput.removeAttr("disabled");
    passwordInput.removeAttr("disabled");
    $(".login-preloader").removeClass("active");
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
