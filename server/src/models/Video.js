const { Schema, model } = require('mongoose');

const videoSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Video title is required'],
			trim: true,
			unique: true,
		},
		synopsis: {
			type: String,
		},
		img: {
			type: String,
		},
		trailer: {
			type: String,
		},
		media: {
			type: String,
			required: [true, 'Video is required'],
		},
		runTime: {
			type: String,
		},
		year: {
			type: String,
		},
		rating: {
			type: String,
		},
		genre: {
			type: String,
		},
		isSeries: {
			type: Boolean,
			default: false,
		},
		seriesType: {
			type: String,
		},
		seriesTitle: {
			type: String,
		},
		season: {
			type: String,
		},
		episode: {
			type: String,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Profile',
			required: [true, 'User is required.'],
		},
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

model('Video', videoSchema);
