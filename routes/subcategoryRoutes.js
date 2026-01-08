const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
} = require("../controllers/subcategoryController");

// Routes
router.post("/", createSubCategory);   // ➝ Create new subcategory
router.get("/", getSubCategories);     // ➝ Get all subcategories
router.delete("/:id", deleteSubCategory); // ➝ Delete subcategory

module.exports = router;
