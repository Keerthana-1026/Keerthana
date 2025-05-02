const mongoose = require('mongoose');
 
// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  name: String,
  quantity: { type: Number, default: 1 },
  price: Number,
  image: String,
});
 
// Define the Cart schema
const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
});
 
// Create a Cart model
const Cart = mongoose.model('Cart', cartSchema);
 
module.exports = Cart;
 