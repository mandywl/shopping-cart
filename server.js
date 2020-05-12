const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require("./controllers/routes");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

routes(app);

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});
