import API from "./api";

export const summarizeArticle = async (url) => {
  const res = await API.post("/ai/summarize", {
    url,
  });

  return res.data;
};