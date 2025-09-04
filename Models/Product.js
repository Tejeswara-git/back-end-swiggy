const mongoose = require("mongoose");

const prooductschmea = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
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
  bestseller: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
  },
});

module.exports = mongoose.model("Product", prooductschmea);
