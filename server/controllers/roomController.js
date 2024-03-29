const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const HttpError = require("../models/error");

exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    return next(new HttpError("Update room failed!", 500));
  }
};

exports.updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    return next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      return next(new HttpError("Failed to update hotel", 500));
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, deleting room failed!", 500)
    );
  }
};

exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, couldn't fetch room for the provided id!",
        500
      )
    );
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    return next(new HttpError("Fetch rooms failed!", 500));
  }
};
