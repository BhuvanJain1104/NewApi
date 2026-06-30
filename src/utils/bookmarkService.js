import API from "./api";

// Save Bookmark
export const saveBookmark = async (article) => {
    const res = await API.post("/bookmarks", article);
    return res.data;
};

// Get All Bookmarks
export const getBookmarks = async () => {
    const res = await API.get("/bookmarks");
    return res.data.bookmarks;
};

// Delete Bookmark
export const deleteBookmark = async (id) => {
    const res = await API.delete(`/bookmarks/${id}`);
    return res.data;
};