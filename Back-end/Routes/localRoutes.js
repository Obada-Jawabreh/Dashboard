const express = require("express");
const router = express.Router();
const localControllers = require("../Controllers/localControllers"); // تأكد من المسار الصحيح

// تأكد من أن getCitizenss يتم تصديره بشكل صحيح من وحدة التحكم
router.get("/get-VoteCount", localControllers.getVoteCount); // تأكد من تطابق الاسم

// تأكد من أن addCitizens, updateCitizens, deleteCitizens يتم تصديرهم بشكل صحيح من وحدة التحكم
// router.post("/add-citizens", localControllers.addCitizens);
// router.put("/update-citizens/:id", localControllers.updateCitizens);
// router.delete("/delete-citizens", localControllers.deleteCitizens);

module.exports = router;

// for running ...
// http://localhost:5000/api/VoteCount/localList/get-VoteCount
