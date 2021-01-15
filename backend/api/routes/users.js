const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/", userService.create);
router.delete("/:id", userService.delete);
router.put("/:id", userService.put);

module.exports = router;
