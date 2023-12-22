const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const shortUrlController = require("../controllers/shortUrlController");

router.get("/", userController.home);
router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/shorten", shortUrlController.handleGenerateNewShortUrl);
router.get("/:shortId", shortUrlController.retrieveOriginalUrl);
router.post("/delete/:id", shortUrlController.deleteShortUrl);

module.exports = router;
