const { Router } = require('express');
const { model } = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const List = model('List');
const Profile = model('Profile');

const router = Router();

// Create New List
router.post('/lists', requireAuth, async (req, res) => {
	let errors = {};

	const user = await Profile.findOne({ user: req?.user?._id });

	if (!user) {
		errors.user = 'Error, user not found!';
		return res.status(401).json(errors);
	}

	if (user?.isAdmin) {
		const newList = new List(req?.body);

		try {
			const list = await newList.save();
			res.status(201).json(list);
		} catch (err) {
			errors.list = 'Error creating list!';
			res.status(500).json(errors);
		}
	} else {
		errors.auth = 'You are not authorized!';
		return res.status(403).json(errors);
	}
});

// Get All Lists
router.get('/lists', requireAuth, async (req, res) => {
	const type = req?.query?.type;
	const genre = req?.query?.genre;
	let list = [];
	let errors = {};

	try {
		if (type) {
			if (genre) {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type, genre } },
				]);
			} else {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type } },
				]);
			}
		} else {
			list = await List.aggregate([{ $sample: { size: 10 } }]);
		}
		res.status(200).json(list);
	} catch (err) {
		errors.list = 'Error getting lists!';
		res.status(500).json(errors);
	}
});

// Delete List
router.delete('/:id', requireAuth, async (req, res) => {
	const { id } = req?.params;
	let errors = {};

	const user = await Profile.findOne({ user: req?.user?._id });

	if (!user) {
		errors.user = 'Error, user not found!';
		return res.status(401).json(errors);
	}

	if (user?.isAdmin) {
		try {
			await List.findByIdAndDelete(id);
			res.status(200).json('List deleted...');
		} catch (err) {
			errors.list = 'Error deleting list';
			res.status(500).json(errors);
		}
	} else {
		errors.auth = 'You are not authorized!';
		return res.status(403).json(errors);
	}
});

module.exports = router;
