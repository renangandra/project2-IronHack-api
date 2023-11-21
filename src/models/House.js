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
		location: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
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
	return `${process.env.PATH_UPLOADS}/${this.thumbnail}`;
});
module.exports = model('House', HouseSchema);