// const mongoose = require("mongoose");
// const Admin = require("./models/Admin");

// async function createAdmin() {
//   try {
//     await mongoose.connect("mongodb+srv://vishnup:vishnu8086@cluster0.norh57t.mongodb.net/");

//     const admin = new Admin({
//       email: "admin@example.com",
//       password: "password123",
//     });

//     await admin.save();
//     console.log("✅ Admin user created successfully!");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("❌ Error creating admin:", err.message);
//   }
// }

// createAdmin();
const User = require("./models/User");

async function seedAdmin() {
  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL || "admin@example.com" });
    if (exists) {
      console.log("⚠️ Admin already exists, skipping seeding");
      return;
    }

    const admin = new User({
      username: "superadmin",  // 👈 required field
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASS || "securepassword123",
       role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
}

module.exports = seedAdmin;
