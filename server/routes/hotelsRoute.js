const express = require("express");

const hotelControllers = require("../controllers/HotelController");

const router = express.Router();

//CREATE
router.post("/", hotelControllers.createHotel);
//UPDATE
router.put("/:id", hotelControllers.updateHotel);
//DELETE
router.delete("/:id", hotelControllers.deleteHotel);
//GET 
router.get("/:id", hotelControllers.getHotel);
//GET ALL
router.get('/', hotelControllers.getAllHotels)

module.exports = router;
