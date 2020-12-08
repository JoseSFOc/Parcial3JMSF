const express = require("express");
const router = express.Router();
const locationService = require("../services/locationService");

router.get("/", locationService.findAll);
router.post("/", locationService.create);
router.get("/:id", locationService.findById);
router.delete("/:id", locationService.delete);
router.put("/:id", locationService.put);

module.exports = router;
