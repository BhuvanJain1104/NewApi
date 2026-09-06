const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const summarizeArticle = async (articleText) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: `
You are a news summarization assistant.

Analyze the following news article accurately.

Return:
- summary: a short summary in 2-3 sentences
- keyPoints: 3-5 important points
- whyItMatters: explain why the news matters
- simpleExplanation: explain the news in simple language

Do not add information that is not present in the article.

ARTICLE:
${articleText}
`,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          summary: {
            type: "string",
            description: "A concise 2-3 sentence summary of the article.",
          },

          keyPoints: {
            type: "array",
            items: {
              type: "string",
            },
            description: "3-5 important points from the article.",
          },

          whyItMatters: {
            type: "string",
            description: "Why this news matters.",
          },

          simpleExplanation: {
            type: "string",
            description: "The article explained in simple language.",
          },
        },

        required: [
          "summary",
          "keyPoints",
          "whyItMatters",
          "simpleExplanation",
        ],
      },
    },
  });

  return JSON.parse(response.text);
};

module.exports = {
  summarizeArticle,
};