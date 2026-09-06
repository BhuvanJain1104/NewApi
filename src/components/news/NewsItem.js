import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "../../styles/newsItem.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareNodes,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import {
  saveBookmark,
  getBookmarks,
  deleteBookmark,
} from "../../utils/bookmarkService";
import { summarizeArticle } from "../../utils/aiService";
const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  date,
  author,
  source,
  darkMode,
  onBookmarkChange,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    checkBookmark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsUrl]);
  const checkBookmark = async () => {
    try {
      const bookmarks = await getBookmarks();

      const existing = bookmarks.find(
        (b) => b.url === newsUrl
      );

      if (existing) {
        setBookmarked(true);
        setBookmarkId(existing._id);
      } else {
        setBookmarked(false);
        setBookmarkId(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAISummary = async () => {
    try {
      setShowSummary(true);
      setAiLoading(true);
      setSummary("");

      const data = await summarizeArticle(newsUrl);

      setSummary(data.summary);
    } catch (error) {
      console.error("AI SUMMARY ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to generate AI summary"
      );
    } finally {
      setAiLoading(false);
    }
  };
  const handleBookmark = async () => {
    try {
      if (!bookmarked) {

        const res = await saveBookmark({
          title,
          description,
          imageUrl,
          url: newsUrl,
          date,
          author,
          source,
        });

        setBookmarkId(res.bookmark._id);

        setBookmarked(true);


        toast.success("Added to bookmarks");

      } else {

        await deleteBookmark(bookmarkId);

        setBookmarked(false);
        setBookmarkId(null);

        toast.info("Removed from bookmarks");
      }

      if (onBookmarkChange) {
        onBookmarkChange();
      }

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong");

    }
  };
  const handleShare = async () => {
    const article = {
      title,
      text: description,
      url: newsUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(article);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(newsUrl);
      toast.success("Link copied!");
    }
  };
  return (
    <div className="w-100">
      <div
        className="card shadow-lg news-card h-100 w-100"
        style={{
          backgroundColor: darkMode ? "#1f1f1f" : "#fff",
          color: darkMode ? "#fff" : "#000",
          border: darkMode ? "1px solid #333" : "none",
        }}
      >
        {/* Source Badge */}
        <span className="badge rounded-pill bg-danger news-source">
          {source}
        </span>

        {/* Image */}
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg";
          }}
          className="card-img-top news-image"
          alt={title}
        />

        {/* Body */}
        <div
          className="card-body d-flex flex-column"
          style={{
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <h5 className="news-title">
            {title || "No Title Available"}
          </h5>

          <p className="news-description">
            {description || "No description available."}
          </p>

          {/* Bottom Section */}
          <div className="mt-auto">

            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${darkMode ? "btn-light" : "btn-dark"
                } read-btn`}
            >
              Read More
            </a>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <FontAwesomeIcon
                icon={faBookmark}
                className="bookmark-icon"
                onClick={handleBookmark}
                style={{
                  color: bookmarked ? "#ff9800" : "#777",
                }}
              />

              <FontAwesomeIcon
                icon={faShareNodes}
                className="share-icon"
                onClick={handleShare}
              />
              <FontAwesomeIcon
                icon={faStar}
                className="summary-icon"
                onClick={handleAISummary}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="card-footer news-footer d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: darkMode ? "#111" : "#f8f9fa",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <small>
            🕒{" "}
            {formatDistanceToNow(new Date(date), {
              addSuffix: true,
            })}
          </small>

          <small>
            <i>{author || "Unknown"}</i>
          </small>
        </div>
      </div>

      {/* AI Summary Modal */}
      {showSummary && (
        <div className="ai-overlay">
          <div className="ai-summary-modal">

            <div className="ai-summary-header">
              <h4>✨ AI News Summary</h4>

              <button
                className="ai-close-btn"
                onClick={() => setShowSummary(false)}
              >
                ×
              </button>
            </div>
            <div className="ai-summary-content">
              <span className="ai-source">{source}</span>

              <h3>{title || "No Title Available"}</h3>

              {aiLoading ? (
                <div className="ai-loading">
                  <div className="ai-spinner"></div>

                  <h5>Generating AI Summary...</h5>

                  <p>
                    Please wait while we analyze this article.
                  </p>
                </div>
              ) : (
                <>
                  <div className="ai-section">
                    <h5>Quick Summary</h5>
                    <p>{summary?.summary}</p>
                  </div>

                  <div className="ai-section">
                    <h5>Key Points</h5>

                    <ul>
                      {summary?.keyPoints?.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ai-section">
                    <h5>Why This News Matters</h5>
                    <p>{summary?.whyItMatters}</p>
                  </div>

                  <div className="ai-section">
                    <h5>In Simple Words</h5>
                    <p>{summary?.simpleExplanation}</p>
                  </div>
                </>
              )}
            </div>

            <div className="ai-summary-footer">
              <a
                href={newsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Full Article →
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default NewsItem;