const { Schema, model } = require('mongoose');
const { createCipheriv, randomBytes } = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = Buffer.from(process.env.API_KEY_SECRET, 'hex'); // 32-byte hex string
const IV_LENGTH = 16;

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
			default: 'https://server.nutzflix.net/api/assets/avatars/avatar_26.jpg',
		},
		role: {
			type: String,
			enum: ['superAdmin', 'admin', 'user'],
			required: [true, 'Role is required'],
			default: 'user',
		},
		jellyFinUser: {
			type: String,
			required: true,
		},
		apiKey: {
			type: String,
			required: [true, 'API key is required'],
		},
		favorites: {
			type: Array,
			default: [],
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

function encryptApiKey(apiKey) {
	const iv = randomBytes(IV_LENGTH);
	const cipher = createCipheriv(ALGORITHM, SECRET_KEY, iv);
	const encrypted = Buffer.concat([cipher.update(apiKey), cipher.final()]);
	return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

profileSchema.pre('save', async function () {
	const profile = this;
	if (!profile.isModified('apiKey')) return;

	profile.apiKey = encryptApiKey(profile.apiKey);
});

model('Profile', profileSchema);
