const PartyListCount = require("../Models/partyModels");

const getTotalVoteCountForOnePartyList = async (req, res) => {
  const { partyName } = req.query; // الحصول على اسم القائمة ومعرّف الدائرة من الاستعلام

  try {
    const total_votesForOnePartyLIst =
      await PartyListCount.getVotesForOnePartyList(partyName);
    res.status(200).json({ partyName, total_votesForOnePartyLIst });
  } catch (err) {
    console.error("Error retrieving vote count:", err);
    res.status(500).json({ error: "Server error" });
    }   
};

const getTotalVoteForAllPartyList = async (req, res) => {
  try {
    const total_votesForAllPartyList = await PartyListCount.getVotesForAllPartyLists( );
    res.status(200).json({ total_votesForAllPartyList });
  } catch (err) {
    console.error("Error retrieving total vote count:", err);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  getTotalVoteCountForOnePartyList,
  getTotalVoteForAllPartyList,
}; 
