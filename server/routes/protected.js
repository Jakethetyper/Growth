const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route, accessible only by authenticated users.' });
});

module.exports = router;
