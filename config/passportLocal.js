const User = require("../modals/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Use the LocalStrategy for authenticating users
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Specify the field containing the username (email in this case)
      passReqToCallback: true, // Pass the request object to the callback function
    },
    async function (req, email, password, done) {
      try {
        // Find the user with the provided email
        const user = await User.findOne({ email: email });

        // If user not found, authentication fails
        if (!user) {
          console.log("There is an error in searching the user");
          return done(null, false);
        }

        // Check if the provided password is valid
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
          console.log("Invalid Credentials");
          return done(null, false);
        }

        // Authentication successful, return the user
        return done(null, user);
      } catch (err) {
        // Handle any errors that occur during authentication
        console.log(`Error is ${err}`);
        return done(err);
      }
    }
  )
);

// Serialize user information to store in the session
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async function (id, done) {
  try {
    // Find the user by ID
    const user = await User.findById(id);

    // If user not found, deserialization fails
    if (!user) {
      return done(null, false);
    }

    // Deserialization successful, return the user
    return done(null, user);
  } catch (err) {
    // Handle any errors that occur during deserialization
    return done(err);
  }
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("back");
};

// Middleware to set the authenticated user in res.locals for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
