const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.autoIncrementId = 1; // Start ID from 1
        this.loadProducts(); // Load existing products from file
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.autoIncrementId = this.products.length ? Math.max(this.products.map(p => p.id)) + 1 : 1;
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const product = {
            id: this.autoIncrementId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }
}

// Example usage
const productManager = new ProductManager('products.json');
console.log(productManager.getProducts());
productManager.addProduct({ title: "Laranja", description: "Fruta", price: 5.00, thumbnail: "", code: 1, stock: 10 });
console.log(productManager.getProducts());
