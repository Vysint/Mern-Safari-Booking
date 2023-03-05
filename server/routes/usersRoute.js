const express = require("express");

const userControllers = require("../controllers/UserController");
const tokenControllers = require("../util/verifyToken");

const router = express.Router();

router.get(
  "/checkauthentication",
  tokenControllers.verifyToken,
  (req, res, next) => {
    res.send("Hello user, you are logged in");
  }
);

router.get("/checkuser/:id", tokenControllers.verifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and you can delete your account");
});

router.get(
  "/checkadmin/:id",
  tokenControllers.verifyAdmin,
  (req, res, next) => {
    res.send("Hello admin, you are logged in and you can delete all accounts.");
  }
);

// UPDATE
router.put("/:id", userControllers.updateUser);

// DELETE
router.delete("/:id", userControllers.deleteUser);

// GET
router.get("/:id", userControllers.getUser);

// GET ALL
router.get("/", userControllers.getUsers);

module.exports = router;
