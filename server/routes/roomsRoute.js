const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Rooms endpoint!");
});

module.exports = router;
