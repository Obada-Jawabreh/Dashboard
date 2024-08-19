const RequestLocal = require("./../Models/RequestLocalModels");

async function Get(req, res) {
  try {
    const result = await RequestLocal.GetLocal();
    res.status(200).json(result);
    console.log(result)
  } catch (error) {
    console.error("Error Get Lists:", error);
    res.status(500).json({
      success: false,
      message: "Error getting Lists",
      error: error.message,
    });
  }
}
// -------------------------------------------------------------------
const getCandidates = async (req, res) => {
  const national_id = req.params.national_id; // تأكد من أن national_id يتم استخراجه بشكل صحيح
  try {
    const candidates = await RequestLocal.GetCitizens(national_id);
    if (candidates.length === 0) {
      return res.status(404).json({ message: 'No candidates found for this national_id' });
    }
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ---------------------------------------------------------------------------
const EditListT = async (req, res) => {
  const list_id = req.params.list_id; 
  try {
    const list = await RequestLocal.EditListT(list_id);
    if (list.length === 0) {
      return res.status(404).json({ message: 'No list_id found ' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// -----
const EditListF = async (req, res) => {
  const list_id = req.params.list_id; 
  try {
    const list = await RequestLocal.EditListF(list_id);
    if (list.length === 0) {
      return res.status(404).json({ message: 'No list_id found ' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports={Get ,getCandidates ,EditListT , EditListF};