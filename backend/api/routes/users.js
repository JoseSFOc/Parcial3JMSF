const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.get("/", userService.findAll);
router.post("/", userService.create);
router.get("/:id", userService.findById);
router.delete("/:id", userService.delete);
router.put("/:id", userService.put);

module.exports = router;
