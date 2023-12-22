const { nanoid } = require("nanoid");
const URLShortener = require("../modals/urlShortener");

// Controller function to handle the generation of a new short URL
module.exports.handleGenerateNewShortUrl = async (req, res) => {
  try {
    // Check if the original URL is provided
    if (!req.body.originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Generate a unique short ID using nanoid
    const shortId = nanoid(8);

    // Create a new entry in the URLShortener collection
    const createdEntry = await URLShortener.create({
      shortId,
      originalUrl: req.body.originalUrl,
      user: req.user._id,
    });

    // Redirect to the user's profile after successfully creating the short URL
    return res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function to retrieve and redirect to the original URL
module.exports.retrieveOriginalUrl = async (req, res) => {
  try {
    // Retrieve the short ID from the request parameters
    const shortId = req.params.shortId;

    // Find the URLShortener entry with the given short ID and user ID
    const entry = await URLShortener.findOne({ shortId, user: req.user._id });

    // Check if the entry is found
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect to the original URL
    res.redirect(entry.originalUrl);
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

// Controller function to delete a short URL entry
module.exports.deleteShortUrl = async (req, res) => {
  try {
    // Retrieve the ID from the request parameters
    const id = req.params.id;

    // Find and remove the URLShortener entry by ID
    await URLShortener.findByIdAndDelete(id);

    // Redirect back to the user's profile after deletion
    return res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error(err);
    return res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
