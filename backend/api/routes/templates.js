const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get("/", templateController.findAll);
router.post("/", templateController.create);
router.get("/:id", templateController.findById);
router.delete("/:id", templateController.delete);
router.put("/:id", templateController.put);

module.exports = router;
