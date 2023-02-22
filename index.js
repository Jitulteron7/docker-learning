const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} = require("./config/config");
const app = express();

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  )
  .then(() => {
    console.log("Successfully connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h2>Hi testing</h2>");
});

app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log("listening on port " + port + " development");
  } else {
    console.log("listening on port " + port + " production");
  }
});
