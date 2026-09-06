const { extract } = require("@extractus/article-extractor");
const cheerio = require("cheerio");

const extractArticle = async (url) => {
  try {
    const article = await extract(url);

    if (!article || !article.content) {
      throw new Error("Could not extract article content");
    }

    // Convert article HTML into clean plain text
    const $ = cheerio.load(article.content);

    $("script, style, img, figure").remove();

    const content = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    if (!content) {
      throw new Error("Article content is empty");
    }

    return {
      title: article.title || "",
      description: article.description || "",
      content,
      author: article.author || "",
      source: article.source || "",
      image: article.image || "",
      published: article.published || "",
    };
  } catch (error) {
    console.error("ARTICLE EXTRACTION ERROR:", error.message);
    throw new Error("Unable to extract article content");
  }
};

module.exports = extractArticle;