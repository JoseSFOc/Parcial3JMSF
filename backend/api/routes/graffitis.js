const express = require("express");
const router = express.Router();
const graffitiController = require("../controllers/graffitiController");

router.get("/", graffitiController.findAll);
router.post("/", graffitiController.create);
router.get("/:id", graffitiController.findById);
router.delete("/:id", graffitiController.delete);
router.put("/:id", graffitiController.put);
router.post("/:id/votes/positives", graffitiController.addPositiveVote);
router.delete("/:id/votes/positives", graffitiController.removePositiveVote);
router.post("/:id/votes/negatives", graffitiController.addNegativeVote);
router.delete("/:id/votes/negatives", graffitiController.removeNegativeVote);
router.post("/:id/comment", graffitiController.addComment);

module.exports = router;
