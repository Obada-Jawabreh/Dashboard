const LocalListCount = require("../Models/localModels");

const getVoteCount = async (req, res) => {
  const { listName, districtId } = req.query; // الحصول على اسم القائمة ومعرّف الدائرة من الاستعلام

  try {
    const totalVotes = await LocalListCount.getVoteCountByListAndDistrict(
      listName,
      districtId
    );
    res.status(200).json({ listName, districtId, totalVotes });
  } catch (err) {
    console.error("Error retrieving vote count:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getVoteCount };  // تم تغيير هذا السطر
