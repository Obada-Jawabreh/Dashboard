const Electios = require("../Models/electionsModels");


async function GetDataElectios(req, res) {
  try {
    const result = await Electios.GetElectios(); 
    res.status(200).json(result);
  } catch (error) {
    console.error("Error Get election:", error);
    res.status(500).json({ success: false, message: "Error getting elections", error: error.message });
  }
}

// ---------------------------------------post------------------------------------

async function PostDataElectios(req, res) {
  const {
    electionName,
    electoralDistrict,
    electoralLists,
    startDate,
    endDate,
    status,
    electionType,
  } = req.body;

  try {
    const result = await Electios.PostElectios(
      electionName,
      electoralDistrict,
      electoralLists,
      startDate,
      endDate,
      status,
      electionType
    );

    if (result.success) {
      res.status(201).json({ success: true, id: result.id }); 
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    console.error("Error inserting election:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
// ------------------------------update---------------------------------------
async function UpdateDataElectios(req, res) {
  const electionID = req.params.id;
  const updates = req.body; 

  try {
    const result = await Electios.updateElection(electionID, updates);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error updating election:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
// ------------------------------Delete---------------------------------------
async function DeleteDataElectios(req, res) {
  const electionID = req.params.id;

  try {
    const result = await Electios.deleteElection(electionID);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error delete election:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
module.exports = { PostDataElectios , UpdateDataElectios , GetDataElectios , DeleteDataElectios};    