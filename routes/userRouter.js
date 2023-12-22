// Importing required modules and controllers
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const shortUrlController = require("../controllers/shortUrlController");
const passport = require("../config/passportLocal");

// Routes for rendering different views
router.get("/", userController.home);
router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/signUp", userController.signUp);

// Route for user profile with authentication check
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

// Logout route
router.get("/logout", userController.logout);

// Sign in route using Passport local strategy for authentication
router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/login" }),
  userController.signIn
);

// Shorten URL route
router.post("/shorten", shortUrlController.handleGenerateNewShortUrl);

// Retrieve original URL route using the short URL
router.get("/:shortId", shortUrlController.retrieveOriginalUrl);

// Delete short URL route
router.post("/delete/:id", shortUrlController.deleteShortUrl);

// Exporting the router for use in other parts of the application
module.exports = router;
