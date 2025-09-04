const Product = require("../Models/Product");
const multer = require("multer");
const path = require("path");
const Firm = require("../Models/Firm");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  },
});

const upload = multer({ storage: storage });
const addproduts = async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).json({ message: "Image file is required" });
    // }
    const { productName, price, category, bestseller, description } = req.body;
    // const image = req.file.filename;
    const firmid = req.params.id;
    const firm = await Firm.findById(firmid);
    if (!firm) {
      return res.status(400).json({ message: "Firm not found" });
    }

    const newproduct = new Product({
      productName,
      price,
      category,
      bestseller,

      description,
      firm: firm._id,
    });

    const savedproduct = await newproduct.save();

    firm.product.push(savedproduct._id);
    await firm.save();

    res.status(200).json({ message: "Product added successfully" });
    console.log("Product added successfully");
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getproductsbyfrim = async (req, res) => {
  try {
    const firmid = req.params.firmid;
    const firm = await Firm.findById(firmid);
    if (!firm) {
      return res.status(400).json({ message: "Firm not found" });
    }
    const products = await Product.find({ firm: firmid }).populate("firm");
    const resturentname = firm.name;
    res.status(200).json({ resturentname, products });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

// const getsingleproduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId).populate("firm");

//     res.status(200).json({ product });
//   } catch (error) {
//     console.log("internal server error", error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

const deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedproduct = await Product.findByIdAndDelete(productId);
    if (!deletedproduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  addproduts: [upload.single("image"), addproduts],
  getproductsbyfrim,
  deleteproduct,
};
