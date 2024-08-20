const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('products', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	quantite: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	nom: {
		type: DataTypes.STRING,
		allowNull: false
	},
	prix: {
		type: DataTypes.FLOAT,
		allownull: false
	},
});

module.exports = Product;
