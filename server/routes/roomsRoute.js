const express = require("express");
const { verifyAdmin } = require("../util/verifyToken");
const roomControllers = require("../controllers/roomController");

const router = express.Router();

router.post("/:hotelid", verifyAdmin, roomControllers.createRoom);

router.put("/:id", verifyAdmin, roomControllers.updateRoom);

router.put("/availability/:id", roomControllers.updateRoomAvailability);

router.delete("/:id/:hotelid", verifyAdmin, roomControllers.deleteRoom);

router.get("/:id", roomControllers.getRoom);

router.get("/", roomControllers.getRooms);

module.exports = router;
