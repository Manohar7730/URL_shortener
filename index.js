// Import required modules
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passportLocal"); // Passport Local strategy defined
const userRouter = require("./routes/userRouter"); // user-related routes
require("dotenv").config(); // Load environment variables from a .env file

// Middleware setup
app.use(cookieParser());

// Set view engine and layout options
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", "./views");

// Connect to MongoDB using Mongoose
const db = require("./config/mongoose");

// Session middleware for user authentication
app.use(
  session({
    name: "user",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    maxAge: 1000 * 60 * 15, // 15 minutes
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 minutes
    },
  })
);

// Body parser middleware for handling JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); // middleware to set authenticated user in locals

// userRouter for handling routes
app.use("/", userRouter);

// Server to listen on specified port
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in creating server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
