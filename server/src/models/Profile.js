const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
	{
		theme: {
			type: String,
			enum: ['light', 'dark'],
			default: 'dark',
		},
		firstName: {
			type: String,
		},
		profilePhoto: {
			type: String,
			default: 'http://localhost:3005/assets/avatars/avatar_26.jpg',
		},
		role: {
			type: String,
			enum: ['superAdmin', 'admin', 'user'],
			required: [true, 'Role is required'],
			default: 'user',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
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

model('Profile', profileSchema);
