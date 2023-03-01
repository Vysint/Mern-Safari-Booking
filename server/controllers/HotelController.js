const Hotel = require("../models/Hotel");
const HttpError = require("../models/error");

//CREATE
exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    return next(new HttpError("Something went wrong, try again later", 500));
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (err) {
    return next(new HttpError("Updatedn failed, try again later", 500));
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted!");
  } catch (err) {
    return next(new HttpError("Delete failed, try again later", 500));
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    return next(
      new HttpError("Could not find a hotel for the provided id", 500)
    );
  }
};

exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({ hotels: hotels });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not retrieve the data", 500)
    );
  }
};
