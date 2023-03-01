const bcrypt = require("bcryptjs");

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
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return next(new HttpError("User not found!", 404));
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return next(new HttpError("Wrong Password!", 400));
    }
    // const {password, isAdmin, ...otherDetails} = existingUser._doc
    res
      .status(200)
      .json({ userId: existingUser.id, email: existingUser.email });
  } catch (err) {
    return next(new HttpError("Login in failed, try again later.", 500));
  }
};
