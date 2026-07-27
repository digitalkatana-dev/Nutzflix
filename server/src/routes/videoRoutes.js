const { Router } = require('express');
const { model } = require('mongoose');
const axios = require('axios');
const requireAuth = require('../middleware/requireAuth');
const { decryptApiKey } = require('../util/helpers');
const { getCachedVideos, withStreamUrls } = require('../util/videoCache');
const Video = model('Video');
const Profile = model('Profile');

const router = Router();

// Get All Videos
router.get('/api/videos', requireAuth, async (req, res) => {
	let errors = {};

	try {
		const user = await Profile.findOne({ user: req?.user?._id });
		const decryptedApiKey = decryptApiKey(user.apiKey);

		const { allVideos, series } = getCachedVideos();
		const movies = withStreamUrls(getCachedVideos().movies, decryptedApiKey);
		const seriesWithStreamUrls = series.map((s) => ({
			...s,
			seasons: s.seasons.map((season) => ({
				...season,
				episodes: withStreamUrls(season.episodes, decryptedApiKey),
			})),
		}));

		res.json({
			allVideos,
			movies,
			series: seriesWithStreamUrls,
		});
	} catch (err) {
		console.log('Video Error: ', err);
		errors.videos = 'Failed to load videos';
		return res.status(500).json(errors);
	}
});

module.exports = router;
