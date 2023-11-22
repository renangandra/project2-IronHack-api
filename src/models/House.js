const { Schema, model} = require('mongoose');

const HouseSchema = new Schema(
	{
		thumbnail: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		dateInitial: {
			type: Date,
			required: true,
		},
		dateFinished: {
			type: Date,
			required: true,
		},
		status: {
			type: Boolean,
			required: false,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

HouseSchema.virtual('thumbnail_url').get(function () {
	return `http://localhost:5000/uploads/${this.thumbnail}`;
});
module.exports = model('House', HouseSchema);