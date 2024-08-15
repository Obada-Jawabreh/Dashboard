const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminControllers");
const auth = require("../middlewares/auth");

console.log("Setting up admin routes...");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.post("/view", auth, adminController.view);
router.get("/protected-route", auth, adminController.protectedRoute);

console.log("Admin routes set up completed");

module.exports = router;
