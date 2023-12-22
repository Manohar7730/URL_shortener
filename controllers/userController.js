// userController.js
const { registerValidation, loginValidation } = require("../validate");
const bcrypt = require("bcryptjs");
const User = require("../modals/user");
const URLShortener = require("../modals/urlShortener");

module.exports.home = async (req, res) => {
  try {
    // Render the home view with the fetched URLs
    return res.render("home", {
      title: "Home",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    return res.render("login", {
      title: "Login Page",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports.register = async (req, res) => {
  try {
    return res.render("register", {
      title: "Register Page",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports.signUp = async (req, res) => {
  console.log(req.body);
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
    return res.status(500).redirect("register");
  }
};

module.exports.signIn = async (req, res) => {
  console.log(req.body);

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
  res.status(201).redirect("/profile");
};

module.exports.profile = async (req, res) => {
  try {
    const URLShorteners = await URLShortener.find({});
    return res.render("profile", {
      title: "profile",
      URLShorteners: URLShorteners,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
