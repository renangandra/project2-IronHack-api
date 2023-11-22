const jwt = require('jsonwebtoken');
const { promisify } = require('util');

require('dotenv').config();

module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token)
		return res.status(401).json({ error: 'Token não existe.' });

	try {
		const decoded = await promisify(jwt.verify)(
			token,
			process.env.JWT_SECRET
		);

		console.log(decoded);
		req.user_id = decoded.id;
		req.email = decoded.email;

		console.log(req.user_id)

		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Token inválido.' });
	}
};