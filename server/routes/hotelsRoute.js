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
//GET
router.get("/:id", hotelControllers.getHotel);
//GET ALL
router.get("/", hotelControllers.getAllHotels);

router.get("/countByCity", hotelControllers.countByCity);

router.get("/countByType", hotelControllers.getAllHotels);

module.exports = router;
