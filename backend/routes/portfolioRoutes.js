const express = require('express');
const router = express.Router();
const {portfolio} = require("../controllers/portfolioController.js");
const {savePortfolio} = require("../controllers/portfolioController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// GET your own portfolio
router.get("/me", authMiddleware, portfolio);

// POST (Save/Create) your portfolio
router.post("/", authMiddleware, savePortfolio);

module.exports = router;