const Vendor = require("../Models/Vendor");
const jwt = require("jsonwebtoken");

const verifytoken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.WHATISYOURNAME);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Invalid token" });
  }
};

module.exports = verifytoken;
