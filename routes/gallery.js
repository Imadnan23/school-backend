const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


router.post("/upload", upload.array("images", 10), (req, res) => {
  const jsonPath = path.join(__dirname, "../uploads/gallery.json");
  let images = [];

  if (fs.existsSync(jsonPath)) {
    images = JSON.parse(fs.readFileSync(jsonPath));
  }

  req.files.forEach(file => {
    const filePath = `/uploads/${file.filename}`;
    images.push(filePath);
  });

  fs.writeFileSync(jsonPath, JSON.stringify(images));

  res.status(200).send("Uploaded");
});

router.get("/images", (req, res) => {
  const jsonPath = path.join(__dirname, "../uploads/gallery.json");
  if (fs.existsSync(jsonPath)) {
    const images = JSON.parse(fs.readFileSync(jsonPath));
    res.json(images);
  } else {
    res.json([]);
  }
});

module.exports = router;
