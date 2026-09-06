require("dotenv").config();

const testGemini = async () => {
  try {
    console.log("Testing Gemini REST API...");
    console.log(
      "Key loaded:",
      !!process.env.GEMINI_API_KEY
    );

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
                  text: "Reply with exactly: GEMINI REST WORKS",
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("TEST ERROR:", error);
  }
};

testGemini();