const mongoose = require("mongoose");

const smithSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    contact1: {
      type: String,
      required: [true, "Primary contact is required"],
      trim: true,
    },
    contact2: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Smith", smithSchema);
