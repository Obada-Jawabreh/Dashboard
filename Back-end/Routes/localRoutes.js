const express = require("express");
const router = express.Router();
const localControllers = require("../Controllers/localControllers"); 

// تأكد من أن getCitizenss يتم تصديره بشكل صحيح من وحدة التحكم
// router.get("/get-TotalVoteCountForOneList", localControllers.getTotalVoteCountForOneList); // تأكد من تطابق الاسم وهاد اهم اشي بالعالم

// مسار الحصول على مجموع الأصوات لجميع القوائم في دائرة معينة
// router.get("/get-TotalVoteCountForAllList", localControllers.getTotalVoteForAllList);


router.get(
  "/get-TotalVoteCountForAllList",
  localControllers.getVotesForAllListsInDistrict
);

// إذا كنت تستخدم استعلامات، يمكنك تغيير المسار ليكون كالتالي:
router.get("/seats", localControllers.getNumberOfSeats);


module.exports = router;

// for running postman ...
// http://localhost:5000/api/VoteCount/localList/get-TotalVoteCountForOneList?listName=الإصلاح الوطني&districtId=1
// http://localhost:5000/api/VoteCount/localList/get-TotalVoteCountForAllList?districtId=1
