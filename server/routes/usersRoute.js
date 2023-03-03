const express = require("express");

const userControllers = require("../controllers/UserController");

const router = express.Router();

// router.post("/", userControllers.createUser);

// UPDATE
router.put("/:id", userControllers.updateUser);

// DELETE
router.delete("/:id", userControllers.deleteUser);

// GET
router.get("/:id", userControllers.getUser);

// GET ALL
router.get("/", userControllers.getUsers);

module.exports = router;
