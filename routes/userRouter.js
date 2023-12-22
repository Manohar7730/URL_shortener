const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const shortUrlController = require("../controllers/shortUrlController");
const passport = require("../config/passportLocal");

router.get("/", userController.home);
router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/signUp", userController.signUp);

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

router.get("/logout", userController.logout);
router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/login" }),
  userController.signIn
);
router.post("/shorten", shortUrlController.handleGenerateNewShortUrl);
router.get("/:shortId", shortUrlController.retrieveOriginalUrl);
router.post("/delete/:id", shortUrlController.deleteShortUrl);

module.exports = router;
