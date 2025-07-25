// backend/addAdmin.js
require('dotenv').config(); // Load .env file
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    const existing = await Admin.findOne({ username: "alfabagodar123@gmail.com" });

    if (existing) {
      console.log("⚠️ Admin already exists:", existing);
    } else {
      const admin = new Admin({ username: "alfabagodar123@gmail.com", password: "alfa123" });
      await admin.save();
      console.log("✅ Admin created:", admin);
    }

    mongoose.disconnect();
  })
  .catch(err => console.error("MongoDB connection error:", err));
