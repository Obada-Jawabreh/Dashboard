const Candidate = require("../Models/candidatesModels");

exports.getCandidatesByDistrict = async (req, res) => {
  const { districtId } = req.params;
  try {
    const candidates = await Candidate.getCandidatesByDistrictAndList(
      districtId
    );
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving candidates" });
  }
};

exports.getCandidatesByGenderAndReligion = async (req, res) => {
  const { districtId, gender, religion } = req.params;
  try {
    const candidates = await Candidate.getCandidatesByGenderAndReligion(
      districtId,
      gender,
      religion
    );
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving candidates" });
  }
};
exports.getCandidatesByFemale = async (req, res) => {
  const { districtId, gender } = req.params;
  try {
    const candidates = await Candidate.getCandidatesByFemale(
      districtId,
      gender
    );
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving candidates" });
  }
};
