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
        const Customer = require('../models/customer');
        const count = await Customer.countDocuments();
        
        if (count === 0) {
            Customer.insertMany([
                {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    address: "123 Main Street, New York, NY 10001",
                    phone: "+1-555-123-4567"
                },
                {
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    address: "456 Park Avenue, Los Angeles, CA 90001",
                    phone: "+1-555-987-6543"
                }
            ])
            console.log('Seed data inserted into MongoDB');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;