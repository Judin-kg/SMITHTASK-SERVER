const SubCategory = require("../models/SubCategory");

// ✅ Create a new Subcategory
exports.createSubCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Subcategory name is required" });
    }

    const existing = await SubCategory.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    const subcategory = new SubCategory({ name });
    await subcategory.save();

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating subcategory", error });
  }
};

// ✅ Get all Subcategories
exports.getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().sort({ createdAt: -1 });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// ✅ Delete Subcategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findByIdAndDelete(id);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};
