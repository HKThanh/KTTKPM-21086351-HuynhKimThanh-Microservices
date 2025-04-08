const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./config/mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

// Connect to MongoDB before starting server
const startServer = async () => {
    try {
        await connectDB();
        
        app.use('/api/orders', orderRoutes);
        
        app.listen(PORT, () => {
            console.log(`Product Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();