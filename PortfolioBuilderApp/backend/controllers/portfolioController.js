const Portfolio = require("../models/portfolio");
const Template = require("../models/Template");

exports.portfolio = async (req, res) => {
    try {
        // req.user.id comes from your JWT auth middleware
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        if (!portfolio) return res.status(404).json({ msg: 'No portfolio found 1' });
        res.json(portfolio);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


// @desc    Save or Update user portfolio
// @route   POST /api/portfolios
exports.savePortfolio = async (req, res) => {
    try {
        const { personalInfo, education, skills, projects, settings, slug } = req.body;

        // --- STRICT TEMPLATE VALIDATION ---
        const requestedTheme = settings?.theme;
        if (requestedTheme) {
            const template = await Template.findOne({ name: requestedTheme });
            
            // 1. If the template doesn't exist in our managed list, block it
            if (!template) {
                return res.status(400).json({ 
                    msg: "The selected theme is not recognized. Please choose a valid template." 
                });
            }

            // 2. If the template is in maintenance mode, block it
            if (template.isAvailable === false) {
                return res.status(403).json({ 
                    msg: template.maintenanceMessage || "This template is currently under maintenance. Please choose another one.",
                    isMaintenance: true
                });
            }
        }

        // Build portfolio object
        const portfolioFields = {
            user: req.user.id, // req.user.id comes from authMiddleware
            personalInfo,
            education,
            skills,
            projects,
            settings,
            slug
        };

        // Check if portfolio already exists for this user
        let portfolio = await Portfolio.findOne({ user: req.user.id });

        if (portfolio) {
            // Update existing portfolio
            portfolio = await Portfolio.findOneAndUpdate(
                { user: req.user.id },
                { $set: portfolioFields },
                { new: true }
            );
            return res.json({ msg: "Portfolio updated successfully", portfolio });
        }

        // Create new portfolio
        portfolio = new Portfolio(portfolioFields);
        await portfolio.save();
        
        res.status(201).json({ msg: "Portfolio created successfully", portfolio });
    } catch (err) {
        console.error("Controller Error:", err.message);
        res.status(500).send("Server Error while saving portfolio");
    }
};

// @desc    Get current user's portfolio
// @route   GET /api/portfolios/me
exports.getMyPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        if (!portfolio) {
            return res.status(404).json({ msg: "No portfolio found for this user" });
        }
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


exports.getPortfolioViaSlug = async (req, res) => {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });
    if (!portfolio) return res.status(404).json({ msg: 'Not found' });
    res.json(portfolio);
}

exports.getFeaturedPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ isFeatured: true })
            .populate('user', ['username', 'email'])
            .sort({ updatedAt: -1 });
        res.json(portfolios);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}