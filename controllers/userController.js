const User = require('../models/User');

// // GET /api/user/profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // Set by JWT middleware

//     const user = await User.findById(userId).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// controllers/userController.js

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};