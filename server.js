require("dotenv").config();
const axios = require("axios");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("./config/passport");

const routes = require("./controllers/routes");

const PORT = process.env.PORT || 3000;
const app = express();

axios.defaults.baseURL = `http://localhost:${PORT}/api/`;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

routes(app);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
