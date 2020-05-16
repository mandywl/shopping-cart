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
  const passwordInput = $("input#password-input");

  signUpForm.on("submit", function(event) {
    event.preventDefault();

    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    signupUser(userData);
    emailInput.val("");
    passwordInput.val("");
  });
});
