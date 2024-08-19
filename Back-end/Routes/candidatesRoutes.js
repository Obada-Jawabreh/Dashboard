const express = require("express");
const router = express.Router();
const candidateController = require("../Controllers/candidatesControllers");

// استرجاع جميع المرشحين في دائرة معينة
router.get(
  "/:districtId",
  candidateController.getCandidatesByDistrict
);


// استرجاع المرشحين بناءً على الجنس والدين في دائرة معينة
router.get(
  "/:districtId/:gender/:religion",
  candidateController.getCandidatesByGenderAndReligion
);

// استرجاع المرشحين بناءً على الجنس 
router.get(
  "/:districtId/:gender",
  candidateController.getCandidatesByFemale
);

module.exports = router;

// http://localhost:5000/api/candidates/district/6
// http://localhost:5000/api/candidates/district/district
// -----------
// http://localhost:5000/api/candidates/6/أنثى/مسلم
// http://localhost:5000/api/candidates/district/gender/religion
// ------------
// http://localhost:5000/api/candidates/6/أنثى
// http://localhost:5000/api/candidates/district/gender