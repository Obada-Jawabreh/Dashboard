// controllers/contactUsController.js
const contactUsModel = require('../Models/contact usModel');

const getAllQueries = async (req, res) => {
  try {
    const queries = await contactUsModel.getAllQueries();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving queries' });
  }
};

module.exports = {
  getAllQueries,
};
