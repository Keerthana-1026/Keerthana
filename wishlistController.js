const WishlistItem = require('../models/WishlistItem');

// Add item to wishlist
// Add item to wishlist
exports.addToWishlist = async (req, res) => {
    try {
      const { name, description, price, image } = req.body;
  
      if (!name || !description || !price || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create new wishlist item
      const newWishlistItem = new WishlistItem({ name, description, price, image });
      await newWishlistItem.save();
  
      res.status(201).json({ message: 'Item added to wishlist' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to wishlist', error });
    }
  };
  
// Get all wishlist items
exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist items', error });
  }
};

// Remove a single item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await WishlistItem.findByIdAndDelete(id);
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from wishlist', error });
  }
};

// Clear the wishlist
exports.clearWishlist = async (req, res) => {
  try {
    await WishlistItem.deleteMany({});
    res.json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing wishlist', error });
  }
};
