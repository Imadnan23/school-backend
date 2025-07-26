const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Models
const Admin = require("./models/Admin");
const Notice = require("./models/notice");

// Routes
const noticeRoutes = require("./routes/noticeRoutes");
const galleryRoutes = require("./routes/gallery"); // ✅ Fixed: previously incorrect alias

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.send('<h2>User not found. <a href="/">Try again</a></h2>');
    }
    if (admin.password === password) {
      return res.redirect("https://alittlefloweracademy.com/admin.html");
    }
    res.send('<h2>Wrong password. <a href="/">Try again</a></h2>');
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

// Use routes
app.use("/notice", noticeRoutes);
app.use("/gallery", galleryRoutes); // ✅ Fixed alias

// Test route
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
