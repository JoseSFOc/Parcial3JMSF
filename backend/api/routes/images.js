const express = require("express");
const router = express.Router();
const imageService = require("../services/imageService");

router.get("/", imageService.findAll);
router.post("/", imageService.create);
router.get("/:id", imageService.findById);
router.delete("/:id", imageService.delete);
router.put("/:id", imageService.put);

module.exports = router;
