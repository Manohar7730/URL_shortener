// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the URLShortener model
const shortUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true, // Ensuring shortId uniqueness
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model for association
    },
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt
);

// Creating the URLShortener model using the defined schema
const URLShortener = mongoose.model("URLShortener", shortUrlSchema);

// Exporting the URLShortener model for use in other parts of the application
module.exports = URLShortener;
