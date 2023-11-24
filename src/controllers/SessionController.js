const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
		const { email, password } = req.body;

		try {
			const response = await User.findOne({ email });

			if (!response)
				return res
					.status(401)
					.json({ error: 'Email not found.' });

			if (!(await bcrypt.compare(password, response.password)))
				return res.status(401).json({ error: 'Incorrect password.' });

			// User data
			const { _id: id, name } = response;

			return res.json({
				id,
				email,
				name,
				token: jwt.sign({ id, email }, process.env.JWT_SECRET, {
					expiresIn: '7d',
				}),
			});
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}
}