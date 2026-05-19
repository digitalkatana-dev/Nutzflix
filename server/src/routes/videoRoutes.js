const { Router } = require('express');
const { model } = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Video = model('Video');
const Profile = model('Profile');

const router = Router();

const roles = ['superAdmin', 'admin'];

// router.put('/videos/all', async (req, res) => {
// 	try {
// 		const updated = await Video.updateMany(
// 			{ media: 'A_Quite_Place.mp4' },
// 			{
// 				media: 'A_Quiet_Place.mp4',
// 			}
// 		);
// 		res.status(200).json(updated);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// Add Video
router.post('/videos/add', requireAuth, async (req, res) => {
	let errors = {};

	const user = await Profile.findOne({ user: req?.user?._id });

	if (!user) {
		errors.user = 'Error, user not found!';
		return res.status(401).json(errors);
	}

	if (roles?.includes(user?.role)) {
		const newVideo = new Video(req?.body);
		try {
			const video = await newVideo.save();
			const updatedVideoList = await Video.find({});
			res.status(200).json({ video, updatedVideoList });
		} catch (err) {
			errors.video = 'Error adding video!';
			res.status(500).json(errors);
		}
	} else {
		errors.auth = 'You are not authorized!';
		return res.status(403).json(errors);
	}
});

// Update Video
router.put('/videos/update/:id', requireAuth, async (req, res) => {
	let errors = {};
	const { id } = req?.params;

	const user = await Profile.findOne({ user: req?.user?._id });

	if (!user) {
		errors.user = 'Error, user not found!';
		return res.status(401).json(errors);
	}

	if (roles?.includes(user?.role)) {
		try {
			const updatedVideo = await Video.findByIdAndUpdate(
				id,
				{
					$set: req?.body,
				},
				{
					new: true,
				},
			);
			const updatedVideos = await Video.find({}).sort('-createdAt');
			res.status(200).json({ updatedVideo, updatedVideos });
		} catch (err) {
			errors.video = 'Error updating video!';
			res.status(500).json(errors);
		}
	} else {
		errors.auth = 'You are not authorized!';
		return res.status(403).json(errors);
	}
});

// Get All Videos
router.get('/videos', requireAuth, async (req, res) => {
	let errors = {};

	const user = await Profile.findOne({ user: req?.user?._id });

	if (!user) {
		errors.user = 'Error, user not found!';
		return res.status(401).json(errors);
	}

	if (roles?.includes(user?.role)) {
		try {
			const videos = await Video.find({}).sort('-createdAt');
			res.status(200).json(videos);
		} catch (err) {
			errors.video = 'Error getting videos!';
			res.status(500).json(errors);
		}
	} else {
		errors.auth = 'You are not authorized!';
		return res.status(403).json(errors);
	}
});

// Get Single Video
router.get('/videos/find/:id', requireAuth, async (req, res) => {
	let errors = {};
	const { id } = req?.params;

	try {
		const video = await Video.findById(id);
		res.status(200).json(video);
	} catch (err) {
		errors.video = 'Error getting video!';
		res.status(500).json(errors);
	}
});

// Get Random
router.get('/videos/random', requireAuth, async (req, res) => {
	const type = req?.query?.type;
	let errors = {};
	let video;

	try {
		if (type === 'series') {
			video = await Video.aggregate([
				{ $match: { isSeries: true } },
				{ $sample: { size: 1 } },
			]);
		} else {
			video = await Video.aggregate([
				{ $match: { isSeries: false } },
				{ $sample: { size: 1 } },
			]);
		}
		res.status(200).json(video);
	} catch (err) {
		errors.video = 'Error getting video!';
		res.status(500).json(errors);
	}
});

// Delete Video
router.delete('/videos/:id', requireAuth, async (req, res) => {
	const { id } = req?.params;
	let errors = {};

	const user = await Profile.findOne({ user: req?.user?._id });

	if (!user) {
		errors.user = 'Error, user not found!';
		return res.status(401).json(errors);
	}

	if (roles?.includes(user?.role)) {
		try {
			const deletedVideo = await Video.findByIdAndDelete(id);
			const updatedVideoList = await Video.find({});
			res.status(200).json({
				updatedVideoList,
				message: `${deletedVideo.title} has been successfully deleted!`,
			});
		} catch (err) {
			errors.video = 'Error updating video!';
			res.status(500).json(errors);
		}
	} else {
		errors.auth = 'You are not authorized!';
		return res.status(403).json(errors);
	}
});

module.exports = router;
