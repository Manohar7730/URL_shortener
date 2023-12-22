const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passportLocal");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", "./views");
const db = require("./config/mongoose");

app.use(
  session({
    name: "user",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    maxAge: 1000 * 60 * 15, // 15 minutes
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 minutes
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", userRouter);

const port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in creating server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
