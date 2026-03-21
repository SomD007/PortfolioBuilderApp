const Portfolio = require("../models/portfolio"); // Ensure path to your model is correct

exports.portfolio = async (req, res) => {
    try {
        // req.user.id comes from your JWT auth middleware
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        if (!portfolio) return res.status(404).json({ msg: 'No portfolio found' });
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