const express = require("express");
const router = express.Router();
const partyControllers = require("../Controllers/partyControllers");

// router.get(
//   "/get-TotalVoteCountForOnePartyList",
//   partyControllers.getTotalVoteCountForOnePartyList
// ); // تأكد من تطابق الاسم وهاد اهم اشي بالعالم

// router.get(
//   "/get-TotalVoteCountForAllPartyList",
//   partyControllers.getTotalVoteForAllPartyList
// );

router.get("/getPartyListResults", partyControllers.getPartyListResults);


module.exports = router;

// for running postman ...
// http://localhost:5000/api/VoteCount/partyList/get-TotalVoteCountForOnePartyList?partyName=الشورى الأردني
// http://localhost:5000/api/VoteCount/partyList/get-TotalVoteCountForAllPartyList
