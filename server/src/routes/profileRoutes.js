const { Router } = require('express');
const { model } = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Profile = model('Profile');

const router = Router();

// Get All
router.get('/api/profiles', requireAuth, async (req, res) => {
	let errors = {};

	try {
		const users = await Profile.find({
			user: {
				$ne: req?.user?._id,
			},
		});

		if (!users) {
			errors.profiles = 'Error, no users found!';
			return res.status(404).json(errors);
		}

		res.json(users);
	} catch (err) {
		console.log('Profile Error: ', err.message);
		errors.profiles = 'Error retreiving users!';
		return res.status(400).json(errors);
	}
});

module.exports = router;
