const express = require("express");
const router = express.Router();
const airQualityService = require("../services/airQualityService");

router.get("/", airQualityService.findAll);

module.exports = router;
