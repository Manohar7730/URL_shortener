// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the registration schema for the User model
const RegisSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensuring email uniqueness
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt
);

// Creating the User model using the registration schema
const User = mongoose.model("User", RegisSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
