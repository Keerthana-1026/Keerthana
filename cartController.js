const Cart = require('../models/cart');
 
// Get Cart for the session or a default cart (if none exists)
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};
 
// Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { name, quantity, price, image } = req.body;
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }
   
    // Check if item already exists in the cart
    const existingItem = cart.items.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity; // Update the quantity
    } else {
      cart.items.push({ name, quantity, price, image });
    }
 
    await cart.save(); // Save the updated cart
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};
 
// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { name } = req.body;
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
 
    // Remove item from the cart
    cart.items = cart.items.filter(item => item.name !== name);
 
    await cart.save(); // Save the updated cart
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};
 
// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
 
    cart.items = []; // Clear the cart items
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};

