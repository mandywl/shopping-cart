module.exports = {
  getIndex: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Hello",
        description: "This is a discription",
        keywords: "here are some keywords",
      };
      res.render("index", { heading: "hello" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  login: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "Login",
        description: "Login here",
        keywords: "login",
      };
      res.render("login", { login: "login" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  signup: async function(req, res) {
    try {
      res.locals.metaTags = {
        title: "signup",
        description: "Signup here",
        keywords: "signup",
      };
      res.render("signup", { signup: "signup" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
