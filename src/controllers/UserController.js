//Onde fica toda a lógica do projeto
const User = require('../models/User');

module.exports = {
    
    // List of all users
    async index(req, res){
        try {
			const response = await User.find();

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    // Specific user details
    async show(req, res){
        const { user_id } = req.params;

		try {
			const response = await User.findOne({
				_id: user_id,
			});

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    //user creation
    async store(req, res){
		try {
			const userExists = await User.findOne({
				$or: [
					{ email: req.body.email }
				],
			});

			if (userExists)
				return res
					.status(400)
					.json({ error: 'This user already exists.' });

			const response = await User.create(req.body);

			return res.json(response);
		} catch (err) {
			return res.json({ error: err.message });
		}
    },

    // deletion
    async destroy(req, res){
        const { user_id } = req.params;

		try {
			const response = await User.findById(user_id);

			await response.remove();

			return res.json({ message: 'Successful deletion.' });
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    //To edit
    async update(req, res){
        const { user_id } = req.params;

		try {
			const user = await User.findById(user_id);

			// Validating that this email does not belong to another user
			if (req.body.email && req.body.email !== user.email) {
				const userExists = await User.findOne({
					email: req.body.email,
				});

				if (userExists)
					return res.status(400).json({
						error: 'This email already belongs to another user.',
					});
			}

			const response = await User.findOneAndUpdate(
				{ _id: user_id },
				req.body,
				{ new: true }
			);

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    }
}