const express = require("express");
const router = express.Router();
const loginService = require("../services/loginService");

router.get("/", loginService.getClientId);
router.post("/", loginService.login);

module.exports = router;
