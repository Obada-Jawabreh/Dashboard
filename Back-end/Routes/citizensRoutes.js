const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const citizensController = require("../Controllers/citizensControllers"); // تأكد من المسار الصحيح
=======

const citizensController = require("../Controllers/citizensControllers"); // تأكد من المسار الصحيح

>>>>>>> 90e56b72bbd58154443eba51900be3392e46e910

// تأكد من أن getCitizenss يتم تصديره بشكل صحيح من وحدة التحكم
router.get("/get-citizens", citizensController.getCitizenss); // تأكد من تطابق الاسم

// تأكد من أن addCitizens, updateCitizens, deleteCitizens يتم تصديرهم بشكل صحيح من وحدة التحكم
// router.post("/add-citizens", citizensController.addCitizens);
// router.put("/update-citizens/:id", citizensController.updateCitizens);
// router.delete("/delete-citizens", citizensController.deleteCitizens);

module.exports = router;