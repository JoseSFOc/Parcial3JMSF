const express = require("express");
const router = express.Router();
const weatherService = require("../services/weatherService");

router.get("/", weatherService.findByCoordinates);

module.exports = router;
