// Get all bookmarks
export const getBookmarks = () => {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
};

// Check if an article is already bookmarked
export const isBookmarked = (url) => {
  const bookmarks = getBookmarks();
  return bookmarks.some((article) => article.url === url);
};

// Save a bookmark
export const saveBookmark = (article) => {
  const bookmarks = getBookmarks();

  // Prevent duplicates
  if (!bookmarks.some((item) => item.url === article.url)) {
    bookmarks.push(article);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

// Remove a bookmark
export const removeBookmark = (url) => {
  const bookmarks = getBookmarks().filter(
    (article) => article.url !== url
  );

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

// Toggle bookmark
export const toggleBookmark = (article) => {
  if (isBookmarked(article.url)) {
    removeBookmark(article.url);
    return false;
  } else {
    saveBookmark(article);
    return true;
  }
};