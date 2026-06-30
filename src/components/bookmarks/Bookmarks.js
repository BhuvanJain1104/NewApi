import React, { useEffect, useState } from "react";
import { getBookmarks } from "../../utils/bookmarkService";
import NewsItem from "../news/NewsItem";

const Bookmarks = ({ darkMode }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    try {
      const bookmarks = await getBookmarks();
      setBookmarks(bookmarks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#000",
        paddingTop: "0px",
        transition: "0.3s"
      }}
    >

      <div className="container">
        <h1
          className="text-center mb-4"
          style={{
            color: darkMode ? "#fff" : "#212529"
          }}
        >
          📑 My Bookmarks
        </h1>
        {bookmarks.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <div className="text-center">
              <h2
                style={{
                  color: darkMode ? "#fff" : "#333",
                }}
              >
                📑
              </h2>

              <h4
                style={{
                  color: darkMode ? "#fff" : "#555",
                }}
              >
                No bookmarks yet.
              </h4>

              <p
                style={{
                  color: darkMode ? "#bbb" : "#777",
                }}
              >
                Save articles to view them here.
              </p>
            </div>
          </div>
        ) : (
          <div className="row">
            {bookmarks.map((article) => (
              <div
                className="col-lg-4 col-md-6 mb-4 d-flex"
                key={article._id}
              >
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                  newsUrl={article.url}
                  date={article.date}
                  author={article.author}
                  source={article.source}
                  darkMode={darkMode}
                  onBookmarkChange={loadBookmarks}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;