const express = require("express");
const router = express.Router();

const electionsController = require("../Controllers/electionsControllers");

router.get("/election", electionsController.GetDataElectios);
router.post("/election", electionsController.PostDataElectios);
router.put('/election/:id', electionsController.UpdateDataElectios);
router.delete('/election/:id', electionsController.DeleteDataElectios);

module.exports = router;