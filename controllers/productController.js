const Product = require("../models/Product");


// Helper to generate code (first letters / first 2 letters)


// const generateCode = (text, twoLetters = false) => {
//   if (!text) return "";
//   const words = text.trim().split(" ");
//   if (twoLetters) return text.substring(0, 2).toLowerCase();
//   return words.map(w => w[0].toLowerCase()).join("");
// };




// // Add new product
// exports.createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json({ success: true, data: product });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// Cloudinary config (set your credentials in .env)

// Multer memory storage (no local file saving)


// Utility function: generate codes
const generateCode = (text, firstTwo = false) => {
  if (!text) return "";
  const words = text.trim().split(" ");
  return firstTwo
    ? words.map(w => w.slice(0, 2).toLowerCase()).join("")
    : words.map(w => w[0].toLowerCase()).join("");
};

// Upload file to Cloudinary (returns promise with result)


// exports.createProduct = async (req, res) => {
//   try {
//     const { smithName, category, subCategory,mc,makingDuration,weight } = req.body;

//     if (!smithName || !category || !subCategory ||!mc||!makingDuration||!weight||!req.file) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Generate prefix like "ar-rg-bb"
//     const smithCode = generateCode(smithName, true);
//     const categoryCode = generateCode(category);
//     const subCatCode = generateCode(subCategory);

//     const prefix = `${smithCode}-${categoryCode}-${subCatCode}`;

//     // Find existing products with same prefix to generate unique sequence
//     const existingProducts = await Product.find({ productId: new RegExp(`^${prefix}`) }).sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (existingProducts.length > 0) {
//       const lastProductId = existingProducts[0].productId;
//       const parts = lastProductId.split("-");
//       const lastNumber = parseInt(parts[parts.length - 1]);
//       if (!isNaN(lastNumber)) {
//         nextNumber = lastNumber + 1;
//       }
//     }

    // const productId = `${prefix}-${String(nextNumber).padStart(3, "0")}`;

//     // const newProduct = await Product.create({
//     //   productId,
//     //   smithName,
//     //   category,
//     //   subCategory,
//     //   mc,
//     //   makingDuration,
//     //   weight,
//     //   image: req.file ? `/uploads/${req.file.filename}` : null, // save uploaded file path
//     // });

//         // Upload image to Cloudinary
//     const uploadResult = await streamUpload(req.file.buffer);

//     // Save product in DB
//     const newProduct = await Product.create({
//       productId,
//       smithName,
//       category,
//       subCategory,
//       mc,
//       makingDuration,
//       weight,
//       image: uploadResult.secure_url, // ✅ Cloudinary URL
//     });

//     res.status(201).json({ success: true, data: newProduct });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



exports.createProduct = async (req, res) => {
  try {
    const { smithName,productName,category, subCategory, mc, makingDuration, weight, image } = req.body;
    console.log(req.body,"ddddddaaata");
    
    if (!smithName || !productName || !category || !subCategory || !mc || !makingDuration || !weight || !image) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }


        // Generate prefix like "ar-rg-bb"
    const smithCode = generateCode(smithName, true);
    const categoryCode = generateCode(category);
    const subCatCode = generateCode(subCategory);
    
        const prefix = `${smithCode}-${categoryCode}-${subCatCode}`;

    // Find existing products with same prefix to generate unique sequence
    const existingProducts = await Product.find({ productId: new RegExp(`^${prefix}`) }).sort({ createdAt: -1 });

    let nextNumber = 1;
    if (existingProducts.length > 0) {
      const lastProductId = existingProducts[0].productId;
      const parts = lastProductId.split("-");
      const lastNumber = parseInt(parts[parts.length - 1]);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const productId = `${prefix}-${String(nextNumber).padStart(3, "0")}`;
    
    const product = new Product({
       productId,
      smithName,
      productName,
      category,
      subCategory,
      mc,
      makingDuration,
      weight,
      image,
    });
console.log(product,"producttttttttt");

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      smithName,
      productName,
      category,
      subCategory,
      mc,
      makingDuration,
      weight,
      image,
    } = req.body;

    // Basic validation
    if (
      !smithName ||
      !productName ||
      !category ||
      !subCategory ||
      !mc ||
      !makingDuration ||
      !weight
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields (DO NOT update productId)
    product.smithName = smithName;
    product.productName = productName;
    product.category = category;
    product.subCategory = subCategory;
    product.mc = mc;
    product.makingDuration = makingDuration;
    product.weight = weight;

    // Update image only if provided
    if (image) {
      product.image = image;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




// const Product = require("../models/Product");
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const streamifier = require("streamifier");

// // Cloudinary config (set your credentials in .env)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer memory storage (no local file saving)
// const storage = multer.memoryStorage();
// exports.upload = multer({ storage });

// // Utility function: generate codes
// const generateCode = (text, firstTwo = false) => {
//   if (!text) return "";
//   const words = text.trim().split(" ");
//   return firstTwo
//     ? words.map(w => w.slice(0, 2).toLowerCase()).join("")
//     : words.map(w => w[0].toLowerCase()).join("");
// };

// // Upload file to Cloudinary (returns promise with result)
// const streamUpload = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (result) resolve(result);
//       else reject(error);
//     });
//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };

// // Create Product
// exports.createProduct = async (req, res) => {
//   try {
//     const { smithName, category, subCategory, mc, makingDuration, weight } = req.body;

//     if (!smithName || !category || !subCategory || !mc || !makingDuration || !weight || !req.file) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Generate prefix like "ar-rg-bb"
//     const smithCode = generateCode(smithName, true);
//     const categoryCode = generateCode(category);
//     const subCatCode = generateCode(subCategory);
//     const prefix = ${smithCode}-${categoryCode}-${subCatCode};

//     // Find existing products with same prefix
//     const existingProducts = await Product.find({
//       productId: new RegExp(^${prefix})
//     }).sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (existingProducts.length > 0) {
//       const lastProductId = existingProducts[0].productId;
//       const parts = lastProductId.split("-");
//       const lastNumber = parseInt(parts[parts.length - 1]);
//       if (!isNaN(lastNumber)) {
//         nextNumber = lastNumber + 1;
//       }
//     }

//     const productId = ${prefix}-${String(nextNumber).padStart(3, "0")};

//     // Upload image to Cloudinary
//     const uploadResult = await streamUpload(req.file.buffer);

//     // Save product in DB
//     const newProduct = await Product.create({
//       productId,
//       smithName,
//       category,
//       subCategory,
//       mc,
//       makingDuration,
//       weight,
//       image: uploadResult.secure_url, // ✅ Cloudinary URL
//     });

//     res.status(201).json({ success: true, data: newProduct });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };