const { Router } = require('express');
const { model } = require('mongoose');
const { sign } = require('jsonwebtoken');
const { genSalt, hash } = require('bcrypt');
const { createHash } = require('crypto');
const { config } = require('dotenv');
const { validateLogin } = require('../util/validators');
const fs = require('fs');
const requireAuth = require('../middleware/requireAuth');
const User = model('User');
const Profile = model('Profile');
const router = Router();
config();

// Login
router.post('/users/auth', async (req, res) => {
	const { valid, errors } = validateLogin(req?.body);

	if (!valid) return res.status(400).json(errors);

	const { email, password } = req?.body;
	let user;

	try {
		user = await User.findOne({ email }).populate('profile');

		if (user) {
			await user?.comparePassword(password);
		} else {
			const newUserData = {
				email,
				password,
			};

			const newUser = new User(newUserData);
			await newUser?.save();

			const profileData = {
				user: newUser?._id,
			};

			const userProfile = new Profile(profileData);
			await userProfile?.save();

			user = await User.findOne({ email }).populate('profile');
		}

		const token = sign({ userId: user?._id }, process.env.DB_SECRET_KEY, {
			expiresIn: '5d',
		});

		res.json({
			success: 'Login successful!',
			userProfile: user.profile,
			token,
		});
	} catch (err) {
		console.log('Signin Error: ', err);
		errors.login = 'Something went wrong! Please try again.';
		return res.status(400).json(errors);
	}
});

module.exports = router;
