const Citizens = require("../Models/citizens");
const getCitizenss = async (req, res) => {
  try {
    const citizens = await Citizens.GetCitizens();
    res.status(200).json(citizens);
  } catch (err) {
    console.error("Error getting citizens:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// تصدير الدوال بشكل صحيح
module.exports = {
  getCitizenss,
  // أضف دوال أخرى هنا إذا لزم الأمر
};
