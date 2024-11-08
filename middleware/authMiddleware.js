// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
	// Obtendo o token do cabeçalho Authorization no formato "Bearer <token>"
	const authHeader = req.header('Authorization');

	if (!authHeader) {
		return res
			.status(401)
			.json({ message: 'Access Denied. No token provided.' });
	}

	// Pega o token que está após "Bearer "
	const token = authHeader.split(' ')[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Access Denied. No token provided.' });
	}

	try {
		// Verifica se o token é válido
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified; // Armazena as informações do usuário decodificadas do token
		next(); // Passa para o próximo middleware ou controlador
	} catch (error) {
		res.status(400).json({ message: 'Invalid Token' });
	}
};
