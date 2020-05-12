module.exports = function (app) {
  app.use(require("./routes/api"));
  app.use(require("./routes/html"));
};
