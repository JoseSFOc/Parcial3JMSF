const express = require("express");
const router = express.Router();
const graffitiService = require("../services/graffitiService");

router.get("/", graffitiService.findAll);
router.post("/", graffitiService.create);
router.get("/:id", graffitiService.findById);
router.delete("/:id", graffitiService.delete);
router.put("/:id", graffitiService.put);
router.post("/:id/votes/positives", graffitiService.addPositiveVote);
router.delete("/:id/votes/positives", graffitiService.removePositiveVote);
router.post("/:id/votes/negatives", graffitiService.addNegativeVote);
router.delete("/:id/votes/negatives", graffitiService.removeNegativeVote);
router.post("/:id/comment", graffitiService.addComment);

module.exports = router;
