const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Template = require('../models/Template');
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

// 5. TOGGLE USER STATUS (Soft Ban)
router.put('/user/:id/toggle-status', [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Prevent admin from banning themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ msg: "You cannot deactivate your own admin account" });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.json({ msg: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, isActive: user.isActive });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 6. TOGGLE PORTFOLIO FEATURED STATUS
router.put('/portfolio/:id/toggle-featured', [auth, admin], async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ msg: "Portfolio not found" });

        portfolio.isFeatured = !portfolio.isFeatured;
        await portfolio.save();

        res.json({ msg: `Portfolio ${portfolio.isFeatured ? 'featured' : 'unfeatured'} successfully`, isFeatured: portfolio.isFeatured });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 7. GET ALL TEMPLATES
router.get('/templates', [auth, admin], async (req, res) => {
    try {
        let templates = await Template.find();
        
        // Sync templates with the exhaustive list from the Builder
        const requiredTemplates = [
            { name: 'minimal', displayName: 'Minimalist Editorial' },
            { name: 'modern', displayName: 'Modern Dark' },
            { name: 'glass', displayName: 'Glassmorphism', isPremium: true },
            { name: 'dark', displayName: 'Dark Sidebar' },
            { name: 'cyber', displayName: 'Cyberpunk' },
            { name: 'professional', displayName: 'Professional' },
            { name: 'neumorphic', displayName: 'Soft Neumorphic' }
        ];

        // Check if we need to seed or add missing templates
        for (const t of requiredTemplates) {
            const exists = await Template.findOne({ name: t.name });
            if (!exists) {
                await Template.create(t);
            }
        }

        const finalTemplates = await Template.find().sort({ name: 1 });
        res.json(finalTemplates);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 8. UPDATE TEMPLATE STATUS
router.put('/templates/:id', [auth, admin], async (req, res) => {
    try {
        const { isAvailable, isPremium, maintenanceMessage } = req.body;
        const template = await Template.findByIdAndUpdate(
            req.params.id,
            { $set: { isAvailable, isPremium, maintenanceMessage } },
            { new: true }
        );
        res.json(template);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;