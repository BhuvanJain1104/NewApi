import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "../../styles/newsItem.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

import {
  saveBookmark,
  getBookmarks,
  deleteBookmark,
} from "../../utils/bookmarkService";
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

  useEffect(() => {
    checkBookmark();
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
    </div>
  );
};

export default NewsItem;