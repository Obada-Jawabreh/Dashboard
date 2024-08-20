// routes/debateRoutes.js
const express = require("express");
const router = express.Router();
const debateController = require("../Controllers/debatesControllers");

router.get("/debates", debateController.getAllDebates);
router.post("/debates/:id/approve", debateController.approveDebate);
router.post("/debates/:id/reject", debateController.rejectDebate);

module.exports = router;
