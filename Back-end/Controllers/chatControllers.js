const Chat = require("../Models/chatModels");

async function GetnationalId(req, res) {
  try {
    const result = await Chat.GetNId();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error Get Message:", error);
    res.status(500).json({
      success: false,
      message: "Error getting Message",
      error: error.message,
    });
  }
}
// -------------------------------Get------------------------------------------------------

async function GetMessageControl(req, res) {
  const { national_id } = req.params;
  try {
    const result = await Chat.GetMessage(national_id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error Get Message:", error);
    res.status(500).json({
      success: false,
      message: "Error getting Message",
      error: error.message,
    });
  }
}
GetnationalId;
// -------------------------------post------------------------------------------------------

async function PostMessageControl(req, res) {
  const { national_id, Message } = req.body;
  try {
    const result = await Chat.PostMessage(national_id, Message);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error Post Message:", error);
    res.status(500).json({
      success: false,
      message: "Error Post Message",
      error: error.message,
    });
  }
}

module.exports = { GetMessageControl, PostMessageControl , GetnationalId};
