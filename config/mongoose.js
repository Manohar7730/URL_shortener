const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_ATLAS_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));
db.once("open", () => {
  console.log("MongoDB is connected");
});

mongoose.set("debug", true);

module.exports = db;
