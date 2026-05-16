const { Schema, model } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');
const { randomBytes, createHash } = require('crypto');

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		passwordChangedAt: {
			type: Date,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetTokenExpires: {
			type: Date,
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

userSchema.virtual('profile', {
	ref: 'Profile',
	localField: '_id',
	foreignField: 'user',
	justOne: true,
});

userSchema.pre('save', async function () {
	const user = this;
	if (!user.isModified('password')) return;

	const salt = await genSalt(10);
	user.password = await hash(user.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	const user = this;

	return await compare(candidatePassword, user.password);
};

userSchema.methods.createPasswordResetToken = function () {
	const user = this;
	const resetToken = randomBytes(32).toString('hex');

	user.passwordResetToken = createHash('sha256')
		.update(resetToken)
		.digest('hex');

	user.passwordResetTokenExpires = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

model('User', userSchema);
