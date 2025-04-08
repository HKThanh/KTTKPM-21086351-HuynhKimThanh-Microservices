const Order = require('../models/order');

const orderController = {
    createOrder: async (req, res) => {
        const { customerId, products } = req.body;
        try {
            const order = new Order({ customerId, products });
            await order.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOrderById: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Order.findById(id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateOrder: async (req, res) => {
        const { id } = req.params;
        const { customerId, products, status } = req.body;
        try {
            const order = await Order.findByIdAndUpdate(
                id,
                { customerId, products, status },
                { new: true }
            );
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Order.findByIdAndDelete(id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json({ message: 'Order deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = orderController;