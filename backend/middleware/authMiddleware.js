const jwt = require("jsonwebtoken");


module.exports = (req, res, next) =>{
    const token = req.header('x-auth-token'); // Check for token in header

    if(!token) return res.status(401).json({msg: "No token, Auth Denied"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add user ID to the request object
        next(); // Add user ID to the request object
    } catch(err){
        res.status(401).json({msg: "Token is not valid"});
    }
};