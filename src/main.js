const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const User = require('./models/user');
const Product = require('./models/product');
const token = require('./middleware/token');
const cors = require('cors');

const app = express();
const port = 3000;

const JWT_SECRET = 'jwt';

app.use(bodyParser.json());
app.use(cors());
app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		console.log("noob")
		let user = await User.findOne({ where: { username: username } });
		console.log(user);
		if (user) {
			return res.status(400).json({ error: 'Username existe déjà' });
		}
		user = await User.findOne({ where: { email: email} });
		if (user) {
			return res.status(400).json({ error: 'Email existe déjà' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			username: username,
			email: email,
			password: hashedPassword,
		});
		return res.status(201).json({ message: 'User registered successfully', user: newUser });
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ where: { email: email} });
		if (!user) {
			return res.status(400).json({ message: 'Invalid email' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: 'Invalid password' });
		}
		const token = jwt.sign({
			id: user.id,
			username: user.username },
			JWT_SECRET, { expiresIn: '1h' });
		return res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

app.get('/protected', token, async (req, res) => {
	const products = await Product.findAll();
    res.json({ product: products});
});

app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);
});
