const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const HttpError = require("../models/error");

exports.register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ "Registered User": newUser });
  } catch (err) {
    return next(new HttpError("Failed to register user, try again later", 500));
  }
};

exports.login = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return next(new HttpError("User not found!", 404));
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return next(new HttpError("Wrong Password!", 400));
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_KEY
    );
    const { password, isAdmin, ...otherDetails } = existingUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    return next(new HttpError("Login in failed, try again later.", 500));
  }
};
