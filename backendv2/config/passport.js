const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Not user found" });
        } else {
          const match = await user.matchPassword(password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    }).lean();
  });
};
