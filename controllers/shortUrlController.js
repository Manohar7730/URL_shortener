const { nanoid } = require("nanoid");
const URLShortener = require("../modals/urlShortener");

module.exports.handleGenerateNewShortUrl = async (req, res) => {
  try {
    if (!req.body.originalUrl) {
      return res.status(400).json({ error: "url is required" });
    }

    const shortId = nanoid(8);
    const createdEntry = await URLShortener.create({
      shortId,
      originalUrl: req.body.originalUrl,
    });

    return res.redirect("/");
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
    const entry = await URLShortener.findOne({ shortId });

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

module.exports.deleteShortUrl = async (req, res) => {
  try {
    const id = req.params.id;

    // Find and remove the URL entry by ID
    await URLShortener.findByIdAndDelete(id);

    // Redirect back to the home page after deletion
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
