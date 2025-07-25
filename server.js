// backend/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Admin = require('./models/Admin');
require('./db');

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // ✅ JSON middleware goes BEFORE any routes
app.use(express.static(path.join(__dirname, '../frontend')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
app.use("/gallery", require("./routes/gallery"));
app.use('/notice', require('./routes/noticeRoutes'));

// LOGIN ROUTE
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.send('<h2>User not found. <a href="/">Try again</a></h2>');
    }

    if (admin.password === password) {
      return res.redirect('/admin.html');
    } else {
      return res.send('<h2>Wrong password. <a href="/">Try again</a></h2>');
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).send('<h2>Server Error</h2>');
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
