const User = require("../models/User");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

//--- REGISTER LOGIC ---
exports.register = async (req, res) => {
    try{
        let {username, email, password} = req.body;
        let role = 'user'; // Default role is always 'user'
        console.log(username);

        const adminSecret = "123456#";
        if (password.startsWith(adminSecret)) {
            role = 'admin'; // Upgrade role to admin
            password = password.replace(adminSecret, ""); // Remove the key from the actual password
            console.log("Admin registration detected");

            
        }

        //Check if the username exists
        let user = await User.findOne({ email});
        if (user) return res.status(400).json({msg: "User Already Exists"});

        // 2. Hash Password (Feature #1)
        const salt = await bcrypt.genSalt(10); // Generate random "salt"
        const hashedPassword = await bcrypt.hash(password, salt); // Combine salt + password

        // 3. Save User
        user = new User({
            username,
            email,
            password: hashedPassword,
            role: role // Save the determined role (user or admin)
        });
        await user.save();

        res.status(201).json({msg: `User created as ${role}! You can now login.`});

    }catch(err){
        res.status(500).json({err: err.message});
    }
};

// --- LOGIN LOGIC ---
exports.login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        console.log("Login: ",email);

        // 1. Find User
        const user = await User.findOne({email});
        console.log(user);
        if (!user) return res.status(400).json({msg: "Invalid Credentials" });

        // 1.5 Check if Active (Soft Ban Feature)
        if (user.isActive === false) {
            return res.status(403).json({ msg: "Your account has been deactivated. Please contact support." });
        }

        // 2. Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch); 
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials" } );

        // 3. Create JWT Token (Feature #1)
        const token = jwt.sign(
            { 
                user: { 
                    id: user._id, 
                    role: user.role // CRITICAL: This allows the middleware to see your role
                } 
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log(token);
        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role}
        });



    }catch (err){
        res.status(500).json({error: err.message});
    }
};


exports.getMe = async (req, res) => {
    try {
        // req.user.id comes from your authMiddleware
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// password.replace("123456#", "") turns the string back into just mypassword.

// This ensures that when the user logs in later, they don't have to type the secret key anymore.


