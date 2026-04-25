module.exports = function (req, res, next) {
    // Debugging line to see exactly what the server sees
    console.log("Middleware Check - User Data:", req.user);

    // If authMiddleware set req.user = decoded.user, then req.user.role exists
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            msg: "Access Denied: Admin privileges required.",
            debugRole: req.user ? req.user.role : "No role found" 
        });
    }
};