const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.autoIncrementId = 1; // Inicia ID em 1
        this.loadProducts(); // Carrega produtos existentes no arquivo
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

module.exports = ProductManager;
