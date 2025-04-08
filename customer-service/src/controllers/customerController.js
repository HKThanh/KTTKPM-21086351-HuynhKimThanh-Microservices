const Customer = require('../models/customer');

const customerController = {
    createCustomer: async (req, res) => {
        const { name, email, address, phone } = req.body;
        try {
            const customer = new Customer({ name, email, address, phone });
            await customer.save();
            res.status(201).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCustomers: async (req, res) => {
        try {
            const customers = await Customer.find();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCustomerById: async (req, res) => {
        const { id } = req.params;
        try {
            const customer = await Customer.findById(id);
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateCustomer: async (req, res) => {
        const { id } = req.params;
        const { name, email, address, phone } = req.body;
        try {
            const customer = await Customer.findByIdAndUpdate(
                id,
                { name, email, address, phone },
                { new: true }
            );
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCustomer: async (req, res) => {
        const { id } = req.params;
        try {
            const customer = await Customer.findByIdAndDelete(id);
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json({ message: 'Customer deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = customerController;