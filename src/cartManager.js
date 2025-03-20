const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.autoIncrementId = 1; // Start ID at 1
        this.loadCarts(); // Load existing carts from the file
    }

    loadCarts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            this.autoIncrementId = this.carts.length ? Math.max(this.carts.map(c => c.id)) + 1 : 1;
        }
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));

        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }

    addCart() {
        const cart = {
            id: this.autoIncrementId++,
            products: []
        };
        this.carts.push(cart);
        this.saveCarts();
        return cart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.getCartById(cartId);
        if (cart) {
            const existingProduct = cart.products.find(p => p.product === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity; // Increment quantity
            } else {
                cart.products.push({ product: productId, quantity });
            }
            this.saveCarts();
        }
    }

    getProductsInCart(cartId) {
        const cart = this.getCartById(cartId);
        return cart ? cart.products : [];
    }
}

module.exports = CartManager;
