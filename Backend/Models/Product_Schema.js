const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Productname: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    ProductCondition: {
      type: String,
      enum: ["New", "Used", "Refurbished"],
      required: true,
    },
    monthsUsed: {
      type: Number,
      min: 0,
    },
    Stock: {
      type: Number,
      required: true,
    },
    category: String,
    images: [String],
    CurrentlyAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
