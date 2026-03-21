const User = require("../models/user");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

//--- REGISTER LOGIC ---
exports.register = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        console.log(username);

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
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({msg: "User created! You can now login."});

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

        // 2. Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch); 
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials" } );

        // 3. Create JWT Token (Feature #1)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d"} // Token lasts 24 hours

        );
        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email}
        });



    }catch (err){
        res.status(500).json({error: err.message});
    }
};