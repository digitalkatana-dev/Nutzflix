const { Schema, model } = require('mongoose');

const listSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		type: {
			type: String,
		},
		genre: {
			type: String,
		},
		content: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Video',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
		timestamps: true,
	},
);

model('List', listSchema);
