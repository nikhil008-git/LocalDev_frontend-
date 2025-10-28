const { Router } = require('express');
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require('../middleware/user');
const bcrypt = require('bcrypt');
const { userSignupSchema, userSigninSchema } = require("../schema/user");

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        // Validate input
        const parsedData = userSignupSchema.safeParse(req.body);
        
        if (!parsedData.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: parsedData.error.errors
            });
        }

        const { email, password, name } = parsedData.data;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await userModel.create({
            email,
            password: hashedPassword,
            name
        });

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            error: 'Failed to create user',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

userRouter.post('/signin', async (req, res) => {
    try {
        // Validate input
        const parsedData = userSigninSchema.safeParse(req.body);
        
        if (!parsedData.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: parsedData.error.errors
            });
        }

        const { email, password } = parsedData.data;

        // Find user
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // Compare password
        const matchedPassword = await bcrypt.compare(password, user.password);

        if (!matchedPassword) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, {
            expiresIn: '7d' // Optional: add token expiration
        });

        res.json({
            token,
            message: "Signed in successfully"
        });

    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            error: 'Failed to sign in',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

userRouter.post('/signout', userMiddleware, async (req, res) => {
    try {
        // Delete token from user
        await userModel.findOneAndUpdate({ _id: req.userId }, { token: null });

        res.json({
            message: "Signed out successfully"
        });

    } catch (error) {
        console.error('Signout error:', error);
        res.status(500).json({
            error: 'Failed to sign out',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = {
    userRouter
};