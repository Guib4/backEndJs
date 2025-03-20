const express = require('express');
const ProductManager = require('./productManager');
const fs = require('fs');

const app = express();
const productManager = new ProductManager('products.json');
app.use(express.json()); // Middleware to parse JSON bodies

// Set up the /api/products routes
app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = productManager.getProducts();
    
    if (limit && limit > 0) {
        return res.json(products.slice(0, limit));
    }
    
    res.json(products);
});

// Endpoint to get a product by ID
app.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    
    if (product) {
        return res.json(product);
    }
    
    res.status(404).json({ error: 'Product not found' });
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    productManager.addProduct({ title, description, price, thumbnail, code, stock });
    res.status(201).json({ message: 'Product added successfully' });
});

// Update a product by ID
app.put('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Product updated successfully' });
});

// Delete a product by ID
app.delete('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    productManager.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
});

// Set up the /api/carts routes
const CartManager = require('./cartManager');
const cartManager = new CartManager('carts.json');

// Set up the /api/carts routes
app.post('/api/carts', (req, res) => {
    const cart = cartManager.addCart(); // Generate unique id and add cart
    res.status(201).json(cart);
});

app.get('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const products = cartManager.getProductsInCart(cartId);
    res.json(products);
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity;
    cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Product added to cart successfully' });
});


app.get('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const products = cartManager.getProductsInCart(cartId);
    res.json(products);
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity;
    cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Product added to cart successfully' });
});


// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
