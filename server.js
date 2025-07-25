// backend/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Admin = require('./models/Admin');
require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
  origin: 'https://alittlefloweracademy.com', // your Hostinger domain
  methods: ['POST'],
}));



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
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (admin.password === password) {
      return res.json({ success: true }); // ✅ success response
    } else {
      return res.status(401).json({ success: false, message: 'Wrong password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
