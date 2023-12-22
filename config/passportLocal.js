const User = require("../modals/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          console.log("There is an error in searching the user");
          return done(null, false);
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
          console.log("Invalid Credentials");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log(`Error is ${err}`);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("back");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
