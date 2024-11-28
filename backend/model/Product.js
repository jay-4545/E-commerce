const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 300,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 2000,
  },

  images: {
    type: [String],
    validate: {
      validator: function (images) {
        if (!Array.isArray(images) || images.length === 0) {
          return false;
        }
        return true;
      },
      message: "At Least Two images is required!",
    },
  },

  price: {
    type: Number,
    min: 100,
    required: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    min: 0,
    default: 0,
  },

  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },

  taxPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },

  shippingFee: {
    type: Number,
    min: 0,
    default: 0,
  },

  category: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Category",
  },

  subCategory: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "SubCategory",
  },

  qty: {
    type: Number,
    min: 0,
    default: 0,
  },

  isTrending: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
