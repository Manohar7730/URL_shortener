// userController.js

const URLShortener = require("../modals/urlShortener");

module.exports.home = async (req, res) => {
  try {
    // Fetch the URLs from the database
    const URLShorteners = await URLShortener.find({});

    // Render the home view with the fetched URLs
    return res.render("home", {
      title: "Home",
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
