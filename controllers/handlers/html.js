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
};
