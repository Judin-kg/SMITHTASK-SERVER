const User = require("./models/User");

async function seedManager() {
  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL || "manager@gmail.com" });
    if (exists) {
      console.log("⚠️ Manager already exists, skipping seeding");
      return;
    }

    const admin = new User({
      username: "supermanager",  // 👈 required field
      email: process.env.ADMIN_EMAIL || "manager@gmail.com",
      password: process.env.ADMIN_PASS || "manager@123",
       role: "manager",
    });

    await admin.save();
    console.log("✅ Manager user created successfully!");
  } catch (err) {
    console.error("❌ Error creating manager:", err.message);
  }
}

module.exports = seedManager;