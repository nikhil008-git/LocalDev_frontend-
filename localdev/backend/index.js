require('dotenv').config();
console.log('starting server');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

const { userRouter } = require('./routes/user');
app.use('/api/user', userRouter);

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

async function main() {
    try {
        // Check if MONGO_URL exists
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL not found in environment variables');
        }

        // Connect to MongoDB with error handling
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB successfully');

        // Handle mongoose connection errors after initial connection
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}
main();