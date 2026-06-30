import React, { createContext, useEffect, useState } from "react";
import {
  getBookmarks,
  saveBookmark,
  deleteBookmark,
} from "../utils/bookmarkService";

export const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadBookmarks();
    }
  }, []);

  const addBookmark = async (article) => {
    const res = await saveBookmark(article);

    setBookmarks((prev) => [...prev, res.bookmark]);
  };

  const removeBookmark = async (id) => {
    await deleteBookmark(id);

    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark._id !== id)
    );
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        loadBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;