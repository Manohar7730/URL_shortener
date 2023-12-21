const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const URLShortener = mongoose.model("urlShortener", shortUrlSchema);

module.exports = URLShortener;
