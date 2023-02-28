const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const hotelsRoute = require("./routes/hotelsRoute");
const roomsRoute = require("./routes/roomsRoute");

const HttpError = require("./models/http-error");

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//Missing route
app.use((req, res, next) => {
  const error = new HttpError("Could not find the route", 404);
  throw error;
});

// Error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errormessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errormessage,
    stack: err.stack,
  });
});

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
