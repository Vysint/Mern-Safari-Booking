const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to mongoDB");
  } catch (err) {
    throw err;
  }
};

app.listen(process.env.PORT, () => {
  connect();
  console.log("Connected to be Backend");
});
