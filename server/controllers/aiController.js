const extractArticle = require("../utils/articleExtractor");
const { summarizeArticle } = require("../utils/gemini");
const extractNewsArticle = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Article URL is required",
      });
    }

    console.log("Extracting article:", url);

    const article = await extractArticle(url);

    return res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("AI ARTICLE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to extract article",
    });
  }
};
const testGeminiConnection = async (req, res) => {
  try {
    const result = await testGemini();

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Gemini request failed",
    });
  }
};
const summarizeNewsArticle = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Article URL is required",
      });
    }

    console.log("Extracting article for AI summary:", url);

    // Step 1: Extract article
    const article = await extractArticle(url);

    console.log("Article extracted successfully");

    // Step 2: Send article content to Gemini
    const summary = await summarizeArticle(article.content);

    console.log("AI summary generated successfully");

    return res.status(200).json({
      success: true,
      article: {
        title: article.title,
        source: article.source,
        url,
      },
      summary,
    });
  } catch (error) {
    console.error("AI SUMMARY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate AI summary",
    });
  }
};
module.exports = {
  extractNewsArticle,
  testGeminiConnection,
  summarizeNewsArticle,
};