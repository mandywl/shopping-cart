const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Users } = require("../models/models");
const bcrypt = require("bcryptjs");

Users.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

Users.addHook("beforeCreate", (user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});

const strat = {
  usernameField: "email",
};

const validSignin = async (email, password, done) => {
  const dbUser = await Users.findOne({
    where: { email },
  });
  if (!dbUser) {
    return done(null, false, {
      message: "Incorrect email.",
    });
  } else if (!dbUser.validPassword(password)) {
    return done(null, false, {
      message: "Incorrect password.",
    });
  }
  return done(null, dbUser);
};

const serialize = (data, cb) => {
  cb(null, data);
};

passport.use(new LocalStrategy(strat, validSignin));
passport.serializeUser(serialize);
passport.deserializeUser(serialize);

module.exports = passport;
