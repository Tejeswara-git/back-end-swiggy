const mongoose = require("mongoose");

const vendorsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});
module.exports = mongoose.model("Vendor", vendorsSchema);
