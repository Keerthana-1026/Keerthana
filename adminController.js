const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Product = require('../models/Product');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { username, password, email, phone } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        const admin = new Admin({ username, password, email, phone });
        await admin.save();

        res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Error registering admin', error: err });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, msg: 'Admin logged in successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Error logging in admin', error: err });
    }
};
