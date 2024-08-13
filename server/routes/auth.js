const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        console.log('Registration attempt:', req.body);

        const { username, email, password } = req.body;

        // Check if the email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log('User already exists:', existingUser);
            return res.status(400).json({ error: 'User with this email or username already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        console.log('New user created:', newUser);

        // Generate a JWT token for the new user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);

        res.status(201).json({ message: 'User registered successfully!', token });
    } catch (error) {
        console.error('Error during registration:', error.message);
        console.error('Stack Trace:', error.stack); // Log the full stack trace
        res.status(400).json({ error: 'Error registering user', details: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Authentication failed. User not found.');
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Authentication failed. Wrong password.');
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful, token generated:', token);

        res.json({ token, message: 'Login successful!' });
    } catch (error) {
        console.error('Error during login:', error.message);
        console.error('Stack Trace:', error.stack); // Log the full stack trace
        res.status(400).json({ error: 'Error logging in', details: error.message });
    }
});

module.exports = router;
