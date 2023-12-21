const express = require("express");

const port = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  res.end("NEW PROJECT");
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in creating server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
