const axios = require("axios");
const jwt = require("jsonwebtoken");

const cache = require("../utils/cache");
const User = require("../models/User");

const getNews = async (req, res) => {
  try {
    const {
      country = "us",
      category = "general",
      page = 1,
      pageSize = 12,
      search,
    } = req.query;

    let user = null;

    // Authenticate only for personalized news
    if (category === "personalized") {

      const interests =
        user.interests && user.interests.length > 0
          ? user.interests
          : ["general"];

      // Fetch all categories simultaneously
      const responses = await Promise.all(
        interests.map((interest) =>
          axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${interest}&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
          )
        )
      );

      let allArticles = [];

      responses.forEach((response) => {
        if (response.data.articles) {
          allArticles.push(...response.data.articles);
        }
      });

      // Remove duplicate articles
      allArticles = allArticles.filter(
        (article, index, self) =>
          index ===
          self.findIndex(
            (a) => a.url === article.url
          )
      );

      // Shuffle articles
      allArticles.sort(() => Math.random() - 0.5);

      const data = {
        status: "ok",
        totalResults: allArticles.length,
        articles: allArticles,
      };

      cache.set(cacheKey, data);

      return res.json(data);
    }

    // Cache Key
    const cacheKey =
      category === "personalized"
        ? `${user._id}-${page}-${pageSize}`
        : JSON.stringify(req.query);

    // Check Cache
    if (cache.has(cacheKey)) {
      console.log("✅ Cache Hit");
      return res.json(cache.get(cacheKey));
    }

    console.log("🌐 Fetching from NewsAPI");

    let url;

    // Search
    if (search) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        search
      )}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;
    } else {
      let selectedCategory = category;

      // Personalized Category
      if (category === "personalized") {
        if (user.interests && user.interests.length > 0) {
          selectedCategory =
            user.interests[
            Math.floor(
              Math.random() * user.interests.length
            )
            ];
        } else {
          selectedCategory = "general";
        }
      }

      url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${selectedCategory}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;
    }

    const response = await axios.get(url);

    // Save to Cache
    cache.set(cacheKey, response.data);

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch news",
    });
  }
};

module.exports = {
  getNews,
};