const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./Product');

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    Product.schema
  ],
});

const Order = model('Order', orderSchema);

module.exports = Order;
