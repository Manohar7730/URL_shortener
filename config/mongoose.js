const mongoose = require("mongoose");

// Load environment variables from the .env file
const env = require("dotenv").config();

// Connect to MongoDB Atlas using the provided URI
mongoose.connect(process.env.MONGODB_ATLAS_URI);

// Get the default connection
const db = mongoose.connection;

// Event listener for MongoDB connection error
db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

// Event listener for successful MongoDB connection
db.once("open", () => {
  console.log("MongoDB is connected");
});

// Enable Mongoose debugging to log operations
mongoose.set("debug", true);

// Export the database connection for use in other modules
module.exports = db;
