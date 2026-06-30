const User = require("../models/User");

const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("interests");

    res.json({
      success: true,
      interests: user.interests,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: "Interests must be an array",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { interests },
      { new: true }
    ).select("interests");

    res.json({
      success: true,
      message: "Preferences Updated",
      interests: user.interests,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getPreferences,
  updatePreferences,
};