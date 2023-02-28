const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const hotelsRoute = require("./routes/hotelsRoute");
const roomsRoute = require("./routes/roomsRoute");

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

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
