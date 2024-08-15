const express = require("express");
const router = express.Router();
const citizensController = require("../Controllers/citizensController"); // تأكد من المسار الصحيح

// تأكد من أن getCitizenss يتم تصديره بشكل صحيح من وحدة التحكم
router.get("/get-citizens", citizensController.getCitizenss); // تأكد من تطابق الاسم

// تأكد من أن addCitizens, updateCitizens, deleteCitizens يتم تصديرهم بشكل صحيح من وحدة التحكم
// router.post("/add-citizens", citizensController.addCitizens);
// router.put("/update-citizens/:id", citizensController.updateCitizens);
// router.delete("/delete-citizens", citizensController.deleteCitizens);

module.exports = router;