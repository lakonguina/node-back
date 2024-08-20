const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test.db', null, null, {
	dialect: 'sqlite',
	storage: './test.db',
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch(err => {
	console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
