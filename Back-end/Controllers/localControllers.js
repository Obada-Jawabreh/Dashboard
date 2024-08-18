// const LocalListCount = require("../Models/localModels");

// const getTotalVoteCountForOneList = async (req, res) => {
//   const { listName, districtId } = req.query; // الحصول على اسم القائمة ومعرّف الدائرة من الاستعلام

//   try {
//     const total_votesForOneLIst = await LocalListCount.getVotesForOneList(
//       listName,
//       districtId
//     );
//     res.status(200).json({ listName, districtId, total_votesForOneLIst });
//   } catch (err) {
//     console.error("Error retrieving vote count:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const getTotalVoteForAllList = async (req, res) => {
//   const { districtId } = req.query; // الحصول على معرّف الدائرة من الاستعلام

//   try {
//     const total_votesForAllList =
//       await LocalListCount.getVotesForAllListsInOneDistrict(districtId);
//     res.status(200).json({ districtId, total_votesForAllList });
//   } catch (err) {
//     console.error("Error retrieving total vote count:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { getTotalVoteCountForOneList, getTotalVoteForAllList };


// src/controllers/localControllers.js
const LocalListCount = require('../Models/localModels'); // تأكد من المسار الصحيح

// دالة للحصول على بيانات القوائم في دائرة معينة
const getVotesForAllListsInDistrict = async (req, res) => {
  const { districtId } = req.query; // الحصول على معرّف الدائرة من الاستعلام

  try {
    // الحصول على أصوات كل قائمة في الدائرة المحددة
    const lists = await LocalListCount.getVotesForAllListsInDistrict(districtId);

    // حساب مجموع الأصوات
    const totalVotes = lists.reduce((sum, list) => sum + list.vote_count, 0);

    res.status(200).json({ lists, totalVotes });
  } catch (err) {
    console.error("Error retrieving vote counts:", err);
    res.status(500).json({ error: "Server error" });
  }

};

const getNumberOfSeats = async (req, res) => {
 const { districtId } = req.query;
  try {
    if (!districtId) {
      return res.status(400).json({ error: "District ID is required" });
    }

    const numberOfSeats = await LocalListCount.getNumberOfSeats(
      parseInt(districtId, 10)
    );

    return res.status(200).json({ number_of_seats: numberOfSeats });
  } catch (error) {
    console.error(`Error fetching number of seats: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching number of seats" });
  }
};


module.exports = {
  getVotesForAllListsInDistrict,
  getNumberOfSeats,
};
