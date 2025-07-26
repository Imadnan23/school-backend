//backend/routes/noticeRoutes
const express = require("express");
const router = express.Router();
const Notice = require("../models/notice");


// Add new notice
router.post("/add", async (req, res) => {
  const { title, message } = req.body;
  try {
    await Notice.create({ title, message });
    res.status(200).send("Notice added successfully");
  } catch (err) {
    res.status(500).send("Error saving notice");
  }
});

// Get latest 5
router.get("/latest", async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 }).limit(5);
  res.json(notices);
});

// Get all
router.get("/all", async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

module.exports = router;
