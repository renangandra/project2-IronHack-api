//Onde fica toda a lógica do projeto
const House = require('../models/House');

module.exports = {
    
    //Listagen de todos os usuários
    async index(req, res){
        try {
			const response = await House.find();

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    // Detalhes determinado usuário
    async show(req, res){
        const { house_id } = req.params;

		try {
			const response = await House.findOne({
				_id: house_id,
			});

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    //criação usuário
    async store(req, res){
		try {
			const response = await House.create(req.body);

			return res.json(response);
		} catch (err) {
			return res.json({ error: err.message });
		}
    },

    //deleção
    async destroy(req, res){
        const { user_id } = req.headers;
        const { house_id } = req.params;

		try {
            const user = await User.findById(user_id);
			const response = await House.findById(house_id);
            if (String(user._id) !== String(response.user))
                return res.status(401).json({ error: 'Não autorizado.' });
        
			await response.remove();

			return res.json({ message: 'Exclusão bem sucedida.' });
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    //editar
    async update(req, res){
        const { house_id } = req.params;
        const { user_id } = req.headers;

		try {
            const user = await User.findById(user_id);
			const house = await House.findById(house_id);

			// Validando se esse e-mail não pertence a outro usuário
			if (String(user._id) !== String(house.user))
			    return res.status(401).json({ error: 'Não autorizado.' });

			const response = await House.findOneAndUpdate(
				{ _id: house_id },
				req.body,
				{ new: true }
			);

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    }
}