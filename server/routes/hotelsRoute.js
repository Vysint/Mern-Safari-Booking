const express = require("express");

const hotelControllers = require("../controllers/HotelController");
const tokenControllers = require("../util/verifyToken");

const router = express.Router();

//CREATE
router.post("/", tokenControllers.verifyAdmin, hotelControllers.createHotel);
//UPDATE
router.put("/:id", tokenControllers.verifyAdmin, hotelControllers.updateHotel);
//DELETE
router.delete(
  "/:id",
  tokenControllers.verifyAdmin,
  hotelControllers.deleteHotel
);
//GET
router.get("/:id", hotelControllers.getHotel);
//GET ALL
router.get("/", hotelControllers.getAllHotels);

module.exports = router;
