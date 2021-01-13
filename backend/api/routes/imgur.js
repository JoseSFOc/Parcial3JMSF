const express = require("express");
const router = express.Router();
const imgurService = require("../services/imgurService");

router.post("/", imgurService.upload);

module.exports = router;
