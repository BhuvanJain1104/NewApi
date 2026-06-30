const User = require("../models/User");
const Bookmark = require("../models/Bookmark");
const bcrypt = require("bcryptjs");

// ================= GET PROFILE =================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const bookmarkCount = await Bookmark.countDocuments({
      user: req.user.id,
    });

    res.json({
      success: true,
      user,
      bookmarkCount,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile Updated",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const match = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password Changed Successfully",
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
  getProfile,
  updateProfile,
  changePassword,
}; 