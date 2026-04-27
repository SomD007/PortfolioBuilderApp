const express = require('express');
const router = express.Router();
const {portfolio} = require("../controllers/portfolioController.js");
const {savePortfolio} = require("../controllers/portfolioController.js");
const {getPortfolioViaSlug, getFeaturedPortfolios} = require("../controllers/portfolioController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// route till here /api/portfolios

// GET featured portfolios (Public)
router.get("/featured", getFeaturedPortfolios);

// GET all available templates (Public)
router.get("/templates", async (req, res) => {
    try {
        const Template = require('../models/Template');
        
        // --- AUTO-SYNC TEMPLATES ---
        const requiredTemplates = [
            { name: 'minimal', displayName: 'Minimalist Editorial' },
            { name: 'modern', displayName: 'Modern Dark' },
            { name: 'glass', displayName: 'Glassmorphism', isPremium: true },
            { name: 'dark', displayName: 'Dark Sidebar' },
            { name: 'cyber', displayName: 'Cyberpunk' },
            { name: 'professional', displayName: 'Professional' },
            { name: 'neumorphic', displayName: 'Soft Neumorphic' }
        ];

        for (const t of requiredTemplates) {
            const exists = await Template.findOne({ name: t.name });
            if (!exists) {
                await Template.create(t);
            }
        }

        const templates = await Template.find({ isAvailable: true });
        res.json(templates);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// GET your own portfolio
router.get("/me", authMiddleware, portfolio);

// POST (Save/Create) your portfolio
router.post("/", authMiddleware, savePortfolio);

router.get("/:slug", authMiddleware, getPortfolioViaSlug);
module.exports = router;