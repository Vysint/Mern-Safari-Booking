const jwt = require("jsonwebtoken");

const HttpError = require("../models/error");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new HttpError("You are not authenticated!", 401));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(new HttpError("Token is not valid", 403));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(new HttpError("You are not authorized!", 403));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      new HttpError("You are not authorized!", 403);
    }
  });
};
