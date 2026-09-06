const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  extractNewsArticle,
  testGeminiConnection,
  summarizeNewsArticle,
} = require("../controllers/aiController");

router.post("/extract", auth, extractNewsArticle);

router.get("/test", auth, testGeminiConnection);

router.post("/summarize", auth, summarizeNewsArticle);

module.exports = router;