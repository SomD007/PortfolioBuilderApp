const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) =>{
    const token = req.header('x-auth-token'); // Check for token in header

    if(!token) return res.status(401).json({msg: "No token, Auth Denied"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user from DB to check for deactivation (Soft Ban)
        const user = await User.findById(decoded.user.id).select('isActive');
        
        if (!user || user.isActive === false) {
            return res.status(403).json({ msg: "Account deactivated or not found" });
        }

        req.user = decoded.user; // Add user data to the request object
        next();
    } catch(err){
        res.status(401).json({msg: "Token is not valid"});
    }
};