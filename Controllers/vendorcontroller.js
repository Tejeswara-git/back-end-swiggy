// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Vendor = require("../Models/Vendor");

// const vendorregister = async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username, email, and password are required" });
//   }

//   try {
//     const existingVendor = await Vendor.findOne({ email });
//     if (existingVendor) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newVendor = new Vendor({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newVendor.save();
//     res.status(200).json({ message: "Vendor registered successfully" });
//     console.log("Vendor registered successfully");
//   } catch (error) {
//     console.log("Internal server error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const vendorlogin = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const foundVendor = await Vendor.findOne({ email });
//     if (!foundVendor || !foundVendor.password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       foundVendor.password
//     );
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       { id: foundVendor._id },
//       process.env.WHATISYOURNAME,
//       {
//         expiresIn: "1h",
//       }
//     );
//     res.status(200).json({ message: "Vendor logged in successfully", token });
//     console.log(email, "Vendor logged in successfully");
//   } catch (error) {
//     console.log("Internal server error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   vendorregister,
//   vendorlogin,
// };

const jwt = require("jsonwebtoken");

const vendor = require("../Models/Vendor");

const bcrypt = require("bcryptjs");
const Vendor = require("../Models/Vendor");

const vendorregister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const vendoremail = await vendor.findOne({ email });
    if (vendoremail) {
      res.status(400).json("email already exists");
    }
    const hashdedpassword = await bcrypt.hash(password, 10);
    const newvendor = new Vendor({
      username,
      email,
      password: hashdedpassword,
    });

    await newvendor.save();
    res.status(200).json({ message: "vendor registered successfully" });
    console.log("vendor registered successfully");
  } catch (error) {
    console.log("internal server error");
    res.status(500).json({ message: "internal server error" });
  }
};

const vendorlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendorfound = await vendor.findOne({ email });
    if (
      !vendorfound ||
      !(await bcrypt.compare(password, vendorfound.password))
    ) {
      return res.status(400).json("invalid credentials");
    }

    const token = jwt.sign(
      { vendorId: vendorfound._id },
      process.env.WHATISYOURNAME,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "vendor logged in successfully", token });
    console.log(email, "vendor logged in successfully");
  } catch (error) {
    console.log("internal server error :", error);
    res.status(500).json({ message: "internal server error" });
  }
};
const getallvendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("Firm");
    res.status(200).json({ vendors });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getsinglevendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId).populate("Firm");
    res.status(200).json({ vendor });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};
module.exports = {
  vendorregister,
  vendorlogin,
  getallvendors,
  getsinglevendor,
};
