module.exports = {
  isAuthenticated: function(req, res, next) {
    if (req.user) {
      return next();
    }
    return res.redirect("/login");
  },
  apiAuthenticated: function(req, res, next) {
    if (req.user) {
      return next();
    }
    return res.status(401).json({ error: "Unauthorized" });
  },
  isNotAuthenticated: function(req, res, next) {
    if (req.user) {
      return res.redirect("/");
    }
    return next();
  },
  checkAuthenticated: function(req, res, next) {
    req.noauth = "hidden";
    req.auth = "";
    if (req.user) {
      req.auth = "hidden";
      req.noauth = "";
    }
    return next();
  },
};
