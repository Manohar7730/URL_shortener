// Importing necessary modules and files
const { registerValidation, loginValidation } = require("../validate");
const bcrypt = require("bcryptjs");
const User = require("../modals/user");
const URLShortener = require("../modals/urlShortener");

// Controller function for rendering the home page
module.exports.home = async (req, res) => {
  try {
    // Redirect to the user's profile if authenticated
    if (req.isAuthenticated()) {
      res.redirect("/profile/" + req.user._id);
    }
    // Render the home page if not authenticated
    return res.render("home", {
      title: "Home",
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function for rendering the login page
module.exports.login = async (req, res) => {
  try {
    // Redirect to the user's profile if authenticated
    if (req.isAuthenticated()) {
      res.redirect("/profile/" + req.user._id);
    }
    // Render the login page if not authenticated
    return res.render("login", {
      title: "Login Page",
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function for rendering the register page
module.exports.register = async (req, res) => {
  try {
    // Redirect to the user's profile if authenticated
    if (req.isAuthenticated()) {
      res.redirect("/profile/" + req.user._id);
    }
    // Render the register page if not authenticated
    return res.render("register", {
      title: "Register Page",
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function for user registration
module.exports.signUp = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const userData = await newUser.save();
    return res.status(201).redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).redirect("/register");
  }
};

// Controller function for user login
module.exports.signIn = async (req, res) => {
  try {
    // Validating the data
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error);
    }

    // Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Email not found");
    }

    // Password is correct or not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).send("Invalid Credentials");
    }

    // Log in the user
    req.login(user, function (err) {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }
      return res.redirect(`/profile/${user._id}`);
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function for rendering the user's profile
module.exports.profile = async (req, res) => {
  try {
    // Retrieve and render the user's URLShorteners
    const URLShorteners = await URLShortener.find({ user: req.user._id });
    return res.render("profile", {
      title: "Profile",
      URLShorteners: URLShorteners,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function for user logout
module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/");
  });
};
