// backend/models/gallery.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);
