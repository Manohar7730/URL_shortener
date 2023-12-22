const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const userRouter = require("./routes/userRouter");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", "./views");

require("dotenv").config();
const db = require("./config/mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in creating server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
