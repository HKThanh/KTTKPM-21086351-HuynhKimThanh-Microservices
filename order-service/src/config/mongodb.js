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
        const Order = require('../models/order');
        const count = await Order.countDocuments();
        
        if (count === 0) {
            const orders = [
                { customerId: '1', products: [{ productId: '1', quantity: 2 }] },
                { customerId: '2', products: [{ productId: '2', quantity: 1 }] },
                { customerId: '3', products: [{ productId: '3', quantity: 5 }] },
            ];
            await Order.insertMany(orders);
            console.log('Seed data inserted into MongoDB');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;