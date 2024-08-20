const product = require('./models/product');
const user = require('./models/user');

try {
	product.sync({ force: true });
	user.sync({ force: true });
	console.log('Product table created successfully.');
} catch (error) {
	console.error('Error creating product table:', error);
};
