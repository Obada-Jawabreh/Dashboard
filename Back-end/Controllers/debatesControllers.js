// controllers/debateController.js
const Debate = require('../Models/debatesModels');

exports.getAllDebates = async (req, res) => {
  try {
    const debates = await Debate.getAll();
    res.json(debates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch debates' });
  }
};

exports.approveDebate = async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;
  
  try {
    if (code) {
      await Debate.approveDebate(id, code);
      res.json({ message: 'Debate approved successfully' });
    } else {
      res.status(400).json({ error: 'Code is required to approve' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve debate' });
  }
};

exports.rejectDebate = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Debate.rejectDebate(id);
    res.json({ message: 'Debate rejected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject debate' });
  }
};
