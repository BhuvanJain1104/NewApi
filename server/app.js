const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const bookmarkRoutes = require("./routes/bookmark");
const newsRoutes = require("./routes/news");
const userRoutes = require("./routes/user");
const preferenceRoutes = require("./routes/preferences");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/preferences", preferenceRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NewsMonkey Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});