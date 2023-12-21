const express = require("express");
const userRouter = require("./routes/userRouter");

const port = process.env.PORT || 8000;

const app = express();

app.get("/", userRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in creating server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
