const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const connectDB = require('./config/mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(express.json());

// Connect to MongoDB before starting server
const startServer = async () => {
    try {
        await connectDB();
        
        app.use('/api/customers', customerRoutes);
        
        app.listen(PORT, () => {
            console.log(`Customer Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();