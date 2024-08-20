const jwt = require('jsonwebtoken');

// JWT secret key (same as used during token creation)
const JWT_SECRET = 'jwt';

// Middleware pour vérifier le JWT
const authenticateToken = (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
    const token= req.headers['authorization'];
    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    // Vérifier le token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
			console.log(err);
			console.log(JWT_SECRET);
            return res.sendStatus(403); // Forbidden
        }

        // Attacher les informations utilisateur à la requête
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
