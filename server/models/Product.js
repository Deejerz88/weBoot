const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    compareAtPrice: {
      type: Number,
      min: 0.99,
      default: null,
    },
    vendor: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        body: {
          type: String,
        },
      },
    ],
    upc: {
      type: Number,
    },
    variants: [
      {
        id: {
          type: Number,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        inventory: {
          type: Number,
        },
        image: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
