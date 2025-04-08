const express = require('express');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

// Connect to MongoDB before starting server
const startServer = async () => {
    try {
        await connectDB();
        
        app.use('/api/products', productRoutes);
        
        app.listen(PORT, () => {
            console.log(`Product Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();