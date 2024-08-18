const express = require("express");
const router = express.Router();

const chatController = require("../Controllers/chatControllers");

router.get("/national-id", chatController.GetnationalId);
router.get("/chat/:national_id", chatController.GetMessageControl);
router.post("/chat", chatController.PostMessageControl);

module.exports = router;
