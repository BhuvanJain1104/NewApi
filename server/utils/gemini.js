const summarizeArticle = async (articleText) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
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
                },
              ],
            },
          ],

          generationConfig: {
            responseMimeType: "application/json",

            responseSchema: {
              type: "object",

              properties: {
                summary: {
                  type: "string",
                  description:
                    "A concise 2-3 sentence summary of the article.",
                },

                keyPoints: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "3-5 important points from the article.",
                },

                whyItMatters: {
                  type: "string",
                  description: "Why this news matters.",
                },

                simpleExplanation: {
                  type: "string",
                  description:
                    "The article explained in simple language.",
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
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GEMINI REST ERROR:", data);

      throw new Error(
        data?.error?.message || "Gemini API request failed"
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("GEMINI ERROR:", error.message);
    throw error;
  }
};

module.exports = {
  summarizeArticle,
};