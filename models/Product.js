// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     smithName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     subCategory: {
//       type: String,
//       required: true,
//     },
//     weight: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: true,
    },
    smithName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    mc: {
      type: Number,
      required: true,
    },
    makingDuration: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // store file path
      required: true,
    },
  },
  { timestamps: true }
);

  const Product = mongoose.model("Product", productSchema);

module.exports = Product