const express = require("express");
const router = express.Router();

const RequestLocalControl=require('./../Controllers/RequestLocalControllers')

router.get("/local",RequestLocalControl.Get)
router.get('/candidates/:national_id', RequestLocalControl.getCandidates);
router.patch('/edit-list-t/:list_id',RequestLocalControl.EditListT)
router.patch('/edit-list-f/:list_id',RequestLocalControl.EditListF)

module.exports = router;
