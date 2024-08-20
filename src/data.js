const Product = require('./models/product'); // Adjust the path

const addFakeData = async () => {
    try {
        // Fake products data
        const fakeProducts = [
            { quantite: 100, nom: 'Product 1', prix: 19.99 },
            { quantite: 200, nom: 'Product 2', prix: 29.99 },
            { quantite: 150, nom: 'Product 3', prix: 9.99 },
            { quantite: 50, nom: 'Product 4', prix: 49.99 },
            { quantite: 75, nom: 'Product 5', prix: 39.99 }
        ];

        // Insert fake products into the database
        await Product.bulkCreate(fakeProducts);

        console.log('Fake data added successfully!');
    } catch (error) {
        console.error('Error adding fake data:', error);
    }
};

addFakeData();
