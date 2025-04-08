const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: { type: String, default: "pending" }, // pending, confirmed, cancelled
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
