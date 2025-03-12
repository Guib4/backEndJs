const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const productManager = new ProductManager('products.json');

// Endpoint to get all products or a limited number of products
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = productManager.getProducts();
    
    if (limit && limit > 0) {
        return res.json(products.slice(0, limit));
    }
    
    res.json(products);
});

// Endpoint to get a product by ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    
    if (product) {
        return res.json(product);
    }
    
    res.status(404).json({ error: 'Product not found' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
