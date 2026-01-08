const express = require("express");
const router = express.Router();
const {
  createSmith,
  getSmiths,
  getSmithById,
  updateSmith,
  deleteSmith,
} = require("../controllers/smithController");

// Routes
router.post("/", createSmith);
router.get("/", getSmiths);
router.get("/:id", getSmithById);
router.put("/:id", updateSmith);
router.delete("/:id", deleteSmith);

module.exports = router;
