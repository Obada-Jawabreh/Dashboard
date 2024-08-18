const PartyListCount = require("../Models/partyModels");

const getPartyListResults = async (req, res) => {
  try {
    const totalVotes = await PartyListCount.getVotesForAllPartyLists();
    const threshold = 0.025 * totalVotes;
    const allPartyLists = await PartyListCount.getAllPartyLists();
    const totalSeats = 41; // عدد مقاعد القوائم الحزبية

    const qualifiedParties = allPartyLists.filter(
      (party) => party.vote_count >= threshold
    );
    const totalQualifiedVotes = qualifiedParties.reduce(
      (sum, party) => sum + party.vote_count,
      0
    );

    const results = qualifiedParties.map((party) => {
      const rawSeats = (totalSeats / totalQualifiedVotes) * party.vote_count;
      const initialIntegerPart = Math.floor(rawSeats);
      const decimalPart = rawSeats - initialIntegerPart;
      return {
        party_name: party.party_name,
        vote_count: party.vote_count,
        initial_integer_part: initialIntegerPart,
        decimal_part: decimalPart,
        final_seats:
          decimalPart > 0.5 ? initialIntegerPart + 1 : initialIntegerPart,
      };
    });

    res.status(200).json({
      results,
      totalVotes,
      totalSeats,
      threshold,
    });
  } catch (err) {
    console.error("Error in getPartyListResults:", err);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
};

module.exports = {
  getPartyListResults,
};
