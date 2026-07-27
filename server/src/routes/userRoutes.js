const { Router } = require('express');
const { model } = require('mongoose');
const { sign } = require('jsonwebtoken');
const { genSalt, hash } = require('bcrypt');
const { createHash } = require('crypto');
const { config } = require('dotenv');
const { validateRegister, validateLogin } = require('../util/validators');
const {
	refreshVideoCache,
	getCachedVideos,
	withStreamUrls,
} = require('../util/videoCache');
const { decryptApiKey } = require('../util/helpers');
const axios = require('axios');
const fs = require('fs');
const requireAuth = require('../middleware/requireAuth');
const User = model('User');
const Profile = model('Profile');
const router = Router();
config();

// Register
router.post('/api/users/register', requireAuth, async (req, res) => {
	const { valid, errors } = validateRegister(req?.body);

	if (!valid) return res.status(400).json(errors);

	const { firstName, email, password, apiKey, profilePhoto } = req?.body;

	const user = await User.findOne({ email });

	if (user) {
		errors.user = 'Email address already in use.';
		return res.status(400).json(errors);
	}

	try {
		const newUserData = {
			email,
			password,
		};

		const newUser = new User(newUserData);
		await newUser?.save();

		const finUsersRes = await axios.get(
			`${process.env.JELLYFIN_LOCAL_URL}/Users?apiKey=${process.env.ADMIN_API_KEY}`,
		);

		const finUsers = finUsersRes?.data;
		const newUserFinID = () => {
			const user = finUsers?.find((u) => u.Name === email);
			return user ? user.Id : null;
		};

		const profileData = {
			firstName,
			...(profilePhoto && { profilePhoto }),
			jellyFinUser: newUserFinID(),
			apiKey,
			user: newUser?._id,
		};

		const newProfile = new Profile(profileData);
		await newProfile?.save();

		const userProfileRaw = await User.findOne({ email }).populate('profile');

		const userProfile = userProfileRaw?.profile;

		res.json({ success: 'User created successfully!', userProfile });
	} catch (err) {
		errors.user = 'Error creating user!';
		console.log('Registration Error: ', err);
		return res.status(500).json(errors);
	}
});

// Login
router.post('/api/users/auth', async (req, res) => {
	const { valid, errors } = validateLogin(req?.body);

	if (!valid) return res.status(400).json(errors);

	const { email, password } = req?.body;

	try {
		const user = await User.findOne({ email }).populate('profile');

		if (!user) {
			errors.user = 'Error, user not found!';
			return res.status(404).json(errors);
		}

		await user?.comparePassword(password);

		const userProfile = user?.profile;
		const decryptedApiKey = decryptApiKey(userProfile.apiKey);

		const { allVideos, series } = getCachedVideos();
		const movies = withStreamUrls(getCachedVideos().movies, decryptedApiKey);
		const seriesWithStreamUrls = series.map((s) => ({
			...s,
			seasons: s.seasons.map((season) => ({
				...season,
				episodes: withStreamUrls(season.episodes, decryptedApiKey),
			})),
		}));

		const token = sign({ userId: user?._id }, process.env.DB_SECRET_KEY, {
			expiresIn: '5d',
		});

		res.json({
			success: 'Login successful!',
			userProfile,
			token,
			video: {
				allVideos,
				movies,
				series: seriesWithStreamUrls,
			},
		});
	} catch (err) {
		console.log('Signin Error: ', err);
		errors.login = 'Incorrect email or password! Please try again.';
		return res.status(400).json(errors);
	}
});

module.exports = router;
