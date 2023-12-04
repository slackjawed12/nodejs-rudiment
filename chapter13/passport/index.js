const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  console.log("serialize user called");
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    console.log("deserialize user called");
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
