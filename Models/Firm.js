const mongoose = require("mongoose");
const Vendor = require("./Vendor");

const firmsSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: String,
        enum: ["south-indian", "north-indian", "chinese", "bakery"],
      },
    ],
  },
  offer: {
    type: String,
  },
  Image: {
    type: String,
  },

  Vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Firm", firmsSchema);
