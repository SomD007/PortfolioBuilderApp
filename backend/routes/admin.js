const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/admin');

// 1. GET ALL USERS (Requirement #1)
router.get('/users', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 2. GET ALL PORTFOLIOS (Requirement #1)
router.get('/portfolios', [auth, admin], async (req, res) => {
    try {
        const portfolios = await Portfolio.find().populate('user', ['username', 'email']);
        res.json(portfolios);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 3. DELETE USER (Requirement #1)
router.delete('/user/:id', [auth, admin], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Portfolio.deleteMany({ user: req.params.id }); // Clean up their data
        res.json({ msg: "User and their data deleted successfully" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 4. STATS (Requirement #2)
router.get('/stats', [auth, admin], async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const portfolioCount = await Portfolio.countDocuments();
        res.json({ userCount, portfolioCount });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;