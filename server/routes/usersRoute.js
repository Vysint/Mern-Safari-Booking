const express = require("express");

const userControllers = require("../controllers/UserController");

const router = express.Router();

router.post("/", userControllers.createUser);

router.put("/:id", userControllers.updateUser);

router.delete('/:id')

module.exports = router