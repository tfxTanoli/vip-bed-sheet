
import { db } from './firebase.js';
import { products } from './src/data/products.js';

const seedDatabase = async () => {
    console.log('Starting database seed...');
    try {
        const productsRef = db.ref('products');
        await productsRef.set(products);
        console.log('Successfully seeded database with products!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
