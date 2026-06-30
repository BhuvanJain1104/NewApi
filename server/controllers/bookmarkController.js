const Bookmark = require("../models/Bookmark");

// Save Bookmark
const saveBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      url: req.body.url,
      date: req.body.date,
      author: req.body.author,
      source: req.body.source,
    });

    res.status(201).json({
      success: true,
      message: "Bookmark Saved",
      bookmark,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get Logged-in User Bookmarks
// Get Logged-in User Bookmarks
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookmarks,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// Delete Bookmark
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    // Ensure the bookmark belongs to the logged-in user
    if (bookmark.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Bookmark.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bookmark Deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  saveBookmark,
  getBookmarks,
  deleteBookmark,
};