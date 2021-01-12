const express = require("express");
const router = express.Router();
const loginService = require("../services/loginService");

router.options("/", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.end();
});
router.post("/", loginService.login);

module.exports = router;
