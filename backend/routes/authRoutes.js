const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware.js"); 


// POST http://localhost:5000/api/auth/register
router.post('/register', register);

router.get("/register", (req, res) =>{
    res.json({status: "Backend Connected", name:"Anjali"});
});

// POST http://localhost:5000/api/auth/login
router.post('/login', login);

router.get('/me', authMiddleware, getMe);

module.exports = router;