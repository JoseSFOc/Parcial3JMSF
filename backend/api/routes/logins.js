const express = require("express");
const router = express.Router();
const loginService = require("../services/loginService");

router.post("/", loginService.login);

module.exports = router;
