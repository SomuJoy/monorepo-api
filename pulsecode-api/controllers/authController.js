const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Signup Controller
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser);
        return res.status(201).json({ code: 200, token, message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        return res.status(200).json({code: 200, token, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Change Password Controller
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT));
        await user.save();
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

module.exports = {
    signup,
    login,
    changePassword,
};
