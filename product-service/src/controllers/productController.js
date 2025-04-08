const Product = require("../models/product");

const productController = {
    createProduct: async (req, res) => {
        try {
            const { name, description, price } = req.body;
            const newProduct = new Product({ name, description, price });
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: "Error creating product", error });
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product)
                return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, price, description } = req.body;
        try {
            const product = await Product.findByIdAndUpdate(
                id,
                { name, price, description },
                { new: true }
            );
            if (!product)
                return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product)
                return res.status(404).json({ message: "Product not found" });
            
            res.status(200).json({ message: "Product deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};


module.exports = productController;