const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connected successfully');
        
        // Check if collection is empty and seed data
        const Product = require('../models/product');
        const count = await Product.countDocuments();
        
        if (count === 0) {
            await Product.insertMany([
                {
                    name: "Test Product 1",
                    description: "Description for product 1",
                    price: 99.99
                },
                {
                    name: "Test Product 2", 
                    description: "Description for product 2",
                    price: 149.99
                }
            ]);
            console.log('Sample data seeded');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;