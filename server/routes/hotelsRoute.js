const express = require("express");

const hotelControllers = require("../controllers/HotelController");
const { verifyAdmin } = require("../util/verifyToken");

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, hotelControllers.createHotel);
//UPDATE
router.put("/:id", verifyAdmin, hotelControllers.updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, hotelControllers.deleteHotel);

router.get("/countByCity", hotelControllers.countByCity);

router.get("/countByType", hotelControllers.countByType);
//GET
router.get("/:id", hotelControllers.getHotel);
//GET ALL
router.get("/", hotelControllers.getHotels);

module.exports = router;
