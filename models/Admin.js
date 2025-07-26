// backend/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

// 'Admin' is the model name, 'admins' is the exact collection name in MongoDB
module.exports = mongoose.model("Admin", adminSchema, "admins");
