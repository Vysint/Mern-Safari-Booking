const express = require("express");

const hotelControllers = require("../controllers/HotelController");

const router = express.Router();

//CREATE
router.post("/", hotelControllers.createHotel);
//UPDATE
//DELETE
//GET
//GET ALL

module.exports = router;
