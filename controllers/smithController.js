const Smith = require("../models/Smith");

// Create new smith
exports.createSmith = async (req, res) => {
  try {
    const smith = await Smith.create(req.body);
    res.status(201).json({ success: true, data: smith });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all smiths
exports.getSmiths = async (req, res) => {
  try {
    const smiths = await Smith.find();
    res.status(200).json({ success: true, data: smiths });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single smith by ID
exports.getSmithById = async (req, res) => {
  try {
    const smith = await Smith.findById(req.params.id);
    if (!smith) return res.status(404).json({ success: false, message: "Smith not found" });
    res.status(200).json({ success: true, data: smith });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update smith
exports.updateSmith = async (req, res) => {
  try {
    const smith = await Smith.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!smith) return res.status(404).json({ success: false, message: "Smith not found" });
    res.status(200).json({ success: true, data: smith });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete smith
exports.deleteSmith = async (req, res) => {
  try {
    const smith = await Smith.findByIdAndDelete(req.params.id);
    if (!smith) return res.status(404).json({ success: false, message: "Smith not found" });
    res.status(200).json({ success: true, message: "Smith deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
