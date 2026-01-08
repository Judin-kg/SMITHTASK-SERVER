const User = require("./models/User");

async function seedManager() {
  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL || "manager@example.com" });
    if (exists) {
      console.log("⚠️ Admin already exists, skipping seeding");
      return;
    }

    const admin = new User({
      username: "supermanager",  // 👈 required field
      email: process.env.ADMIN_EMAIL || "manager@example.com",
      password: process.env.ADMIN_PASS || "securepassword123",
       role: "manager",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
}

module.exports = seedManager;