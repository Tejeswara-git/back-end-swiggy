const Firm = require("../Models/Firm");
const Vendor = require("../Models/Vendor");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addfirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : null;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }

    const newfirm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      Vendor: [vendor._id],
    });
    const savedfirm = await newfirm.save();

    vendor.Firm.push(savedfirm._id);
    await vendor.save();

    res.status(200).json({ message: "Firm added successfully" });
    console.log("Firm added successfully");
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletefirm = async (req, res) => {
  try {
    const firmid = req.params.id;
    const deletedfirm = await Product.findByIdAndDelete(firmid);
    if (!deletedfirm) {
      return res.status(400).json({ message: "firm not found" });
    }
    res.status(200).json({ message: "firm deleted successfully" });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};
module.exports = { addfirm: [upload.single("image"), addfirm], deletefirm };
