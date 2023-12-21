const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const shortUrlController = require("../controllers/shortUrlController");

router.get("/", userController.home);
router.post("/shorten", shortUrlController.handleGenerateNewShortUrl);
router.get("/:shortId", shortUrlController.retrieveOriginalUrl);

module.exports = router;
