//Onde fica toda a lógica do projeto
const House = require('../models/House');
const User = require('../models/User');

module.exports = {
    
    //List of all users
    async index(req, res){
        try {
			const response = await House.find();

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

	async showByUser(req, res){
		try {
			const response = await House.find({
				user: req.user_id,
			});
			

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    // Specific user details
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

    //user creation
    async store(req, res){
		try {
			const { filename } = req.file;
			const { description, price, dateInitial, dateFinished } = req.body;
			console.log(req.user_id)
			const response = await House.create({
				user: req.user_id,
				thumbnail: filename,
				description,
				price,
				dateInitial,
				dateFinished
			});

			return res.json(response);
		} catch (err) {
			return res.json({ error: err.message });
		}
    },

    //deletion
    async destroy(req, res){
        const { house_id } = req.params;

		try {
            const user = await User.findById(req.user_id);
			const response = await House.findById(house_id);
            if (String(user._id) !== String(response.user))
                return res.status(401).json({ error: 'Not authorized.' });
        
			await response.deleteOne();

			return res.json({ message: 'Successful deletion.' });
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    },

    //To edit
    async update(req, res){
        const { house_id } = req.params;
        const { user_id } = req;

		try {
            const user = await User.findById(user_id);
			const house = await House.findById(house_id);

			// Validando se esse e-mail não pertence a outro usuário
			if (String(user._id) !== String(house.user))
			    return res.status(401).json({ error: 'Not authorized.' });

			const response = await House.findOneAndUpdate(
				{ _id: house_id },
				{
					dateInitial: house.dateInitial,
					dateFinished: house.dateFinished,
					description: house.description,
					price: house.price,
					...req.body,
					thumbnail: req.file || house.thumbnail,
				},
				{ new: true }
			);

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
    }
}