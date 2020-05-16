const loginUser = async (userData) => {
  try {
    await $.post("/api/login", userData);
    window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(function() {
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

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

    emailInput.val("");
    passwordInput.val("");
  });
});
