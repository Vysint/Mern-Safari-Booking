const express = require("express");

const userControllers = require("../controllers/UserController");
const { verifyUser, verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

// router.get(
//   "/checkauthentication",
//   tokenControllers.verifyToken,
//   (req, res, next) => {
//     res.send("Hello user, you are logged in");
//   }
// );

// router.get("/checkuser/:id", tokenControllers.verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and you can delete your account");
// });

// router.get(
//   "/checkadmin/:id",
//   tokenControllers.verifyAdmin,
//   (req, res, next) => {
//     res.send("Hello admin, you are logged in and you can delete all accounts.");
//   }
// );

// UPDATE
router.put("/:id", verifyUser, userControllers.updateUser);

// DELETE
router.delete("/:id", verifyUser, userControllers.deleteUser);

// GET
router.get("/:id", verifyUser, userControllers.getUser);

// GET ALL
router.get("/", verifyAdmin, userControllers.getUsers);

module.exports = router;
