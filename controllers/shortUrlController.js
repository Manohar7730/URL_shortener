const { nanoid } = require("nanoid");
const URLShortener = require("../modals/urlShortener");

module.exports.handleGenerateNewShortUrl = async (req, res) => {
  try {
    if (!req.body.originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(8);
    const createdEntry = await URLShortener.create({
      shortId,
      originalUrl: req.body.originalUrl,
      user: req.user._id,
    });

    return res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports.retrieveOriginalUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URLShortener.findOne({ shortId, user: req.user._id });

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.originalUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// userController.js

module.exports.deleteShortUrl = async (req, res) => {
  try {
    const id = req.params.id;

    // Find and remove the URL entry by ID
    await URLShortener.findByIdAndDelete(id);

    // Redirect back to the user's profile after deletion
    return res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
