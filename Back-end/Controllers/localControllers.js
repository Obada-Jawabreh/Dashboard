const LocalListCount = require("../Models/localModels");

const getTotalVoteCountForOneList = async (req, res) => {
  const { listName, districtId } = req.query; // الحصول على اسم القائمة ومعرّف الدائرة من الاستعلام

  try {
    const total_votesForOneLIst = await LocalListCount.getVotesForOneList(
      listName,
      districtId
    );
    res.status(200).json({ listName, districtId, total_votesForOneLIst });
  } catch (err) {
    console.error("Error retrieving vote count:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getTotalVoteForAllList = async (req, res) => {
  const { districtId } = req.query; // الحصول على معرّف الدائرة من الاستعلام

  try {
    const total_votesForAllList =
      await LocalListCount.getVotesForAllListsInOneDistrict(districtId);
    res.status(200).json({ districtId, total_votesForAllList });
  } catch (err) {
    console.error("Error retrieving total vote count:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getTotalVoteCountForOneList, getTotalVoteForAllList }; 
