const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Get all products
// productController.js

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      // Update the image URL to be accessible
      
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  };
  

// Add a new product (with image upload)
exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
};
