const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoute');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/cart',cartRoutes);
// Routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);



app.use('/admin', (req, res, next) => {
  console.log('Request received at /admin');
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
