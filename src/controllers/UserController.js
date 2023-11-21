//Onde fica toda a lógica do projeto
const User = require('../models/User');

module.exports = {
    
    //Listagen de todos os usuários
    async index(req, res){
        try {
			const response = await User.find();

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    // Detalhes determinado usuário
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

    //criação usuário
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
					.json({ error: 'Esse usuário já existe.' });

			const response = await User.create(req.body);

			return res.json(response);
		} catch (err) {
			return res.json({ error: err.message });
		}
    },

    //deleção
    async destroy(req, res){
        const { user_id } = req.params;

		try {
			const response = await User.findById(user_id);

			await response.remove();

			return res.json({ message: 'Exclusão bem sucedida.' });
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    //editar
    async update(req, res){
        const { user_id } = req.params;

		try {
			const user = await User.findById(user_id);

			// Validando se esse e-mail não pertence a outro usuário
			if (req.body.email && req.body.email !== user.email) {
				const userExists = await User.findOne({
					email: req.body.email,
				});

				if (userExists)
					return res.status(400).json({
						error: 'Esse e-mail já pertence a outro usuário.',
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