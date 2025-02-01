
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds

// Helper function to create JWT
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: maxAge, // Expires in 7 days
    });
};

exports.signup = async (req, res) => {
    try {
        const { 
            fullname, 
            username, 
            email, 
            password, 
            age, 
            nativeLanguage, 
            learningLanguage, 
            speciallyAbled 
        } = req.body;

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        // Check for existing user or email
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Please choose a different one." });
        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists. Please choose a different one." });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            fullname, 
            username, 
            email, 
            password: hashedPassword,
            age,
            nativeLanguage,
            learningLanguage,
            speciallyAbled
        });

        await newUser.save();

        // Create JWT and send as cookie
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: maxAge * 1000, // Convert to milliseconds
            sameSite: 'lax'
        });

        res.status(201).json({ message: "User created successfully.", user: { username: newUser.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log('Login attempt:', { username, password });
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Create JWT and send as cookie
        const token = createToken(user._id);
        res.cookie('jwt', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: maxAge * 1000,
            sameSite: 'strict'
        });

        res.status(200).json({
            message: "Login successful.",
            user: { id: user._id, username: user.username, email: user.email, }
        });
    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({ 
            message: "Error logging in", 
            errorDetails: error.message,
            stack: error.stack 
        });
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // Overwrite the cookie to expire immediately
    res.status(200).json({ message: "Logged out successfully." });
};