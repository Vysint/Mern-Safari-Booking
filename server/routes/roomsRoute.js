const express = require("express");
const { verifyAdmin } = require("../util/verifyToken");
const roomControllers = require("../controllers/roomController");

const router = express.Router();

router.post("/", verifyAdmin, roomControllers.createRoom);

router.put("/:id", verifyAdmin, roomControllers.updateRoom);

router.delete("/:id", verifyAdmin, roomControllers.deleteRoom);

router.get("/:id", roomControllers.getRoom);

router.get("/", roomControllers.getRooms);

module.exports = router;