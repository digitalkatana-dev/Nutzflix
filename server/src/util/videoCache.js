const axios = require('axios');
const pLimit = require('p-limit').default;

const GENRE_NAMES = [
	'Action',
	'Comedy',
	'Drama',
	'Horror',
	'Suspense',
	'Thriller',
	'Fantasy',
	'Romance',
	'Documentary',
	'Sci-Fi',
];

const USER_ID = 'f5234b69f5474d73b64b137346e4b8eb';
const API_KEY = '5f84f87fa5584fd8b700cbcc8b5faf2e';
const LIBRARY_PARENT_ID = '4c029945aca322d34bd0c04870c7ec04';

// Caps total concurrent requests to Jellyfin across movies, series, seasons,
// and episodes combined — regardless of how deep the fetch chain nests.
const JELLYFIN_CONCURRENCY = 5;
const limit = pLimit(JELLYFIN_CONCURRENCY); // for movies + top-level series lookups
const nestedLimit = pLimit(JELLYFIN_CONCURRENCY); // for seasons + episodes calls made *within* a series

// Fail fast instead of hanging forever on a stuck request.
const REQUEST_TIMEOUT = 15000;

let cache = {
	allVideos: [],
	movies: [],
	series: [],
};
let lastRunDate = null;

const getMovieInfo = async (movies) => {
	// let completed = 0;

	const movieInfo = await Promise.all(
		movies.map((movie) =>
			limit(async () => {
				try {
					const res = await axios.get(
						`${process.env.JELLYFIN_LOCAL_URL}/Items/${movie.Id}`,
						{
							params: {
								userId: USER_ID,
								apiKey: API_KEY,
							},
							timeout: REQUEST_TIMEOUT,
						},
					);
					const movieInfoData = res?.data;

					// completed++;
					// if (completed % 25 === 0) {
					// 	console.log(`Movies: ${completed}/${movies.length} done`);
					// }

					return {
						_id: movieInfoData?.Id,
						title: movieInfoData?.Name,
						rating: movieInfoData?.OfficialRating,
						synopsis: movieInfoData?.Overview,
						tagline: movieInfoData?.Taglines?.[0] ?? null,
						genre: movieInfoData?.Genres,
						year: movieInfoData?.ProductionYear,
						trailer: movieInfoData?.RemoteTrailers?.[0]?.Url ?? null,
						people: movieInfoData?.People,
						tags: movieInfoData?.Tags,
						logo: `https://server.nutzflix.net/api/assets/photos/${movieInfoData?.Id}/logo.png`,
						backdrop: `https://server.nutzflix.net/api/assets/photos/${movieInfoData?.Id}/backdrop.jpg`,
						poster: `https://server.nutzflix.net/api/assets/photos/${movieInfoData?.Id}/poster.jpg`,
						videoType: movieInfoData?.Type,
					};
				} catch (err) {
					console.log(`Failed to fetch info for ${movie.Name}: `, err.message);
					return null;
				}
			}),
		),
	);

	return movieInfo.filter(Boolean);
};

const getSeasons = async (seriesId) => {
	// const seasonsStart = Date.now();
	const seasonsInfo = await nestedLimit(() =>
		axios.get(`${process.env.JELLYFIN_LOCAL_URL}/Shows/${seriesId}/Seasons`, {
			params: {
				userId: USER_ID,
				Fields: 'ItemCounts,PrimaryImageAspectRatio,CanDelete,MediaSourceCount',
				apiKey: API_KEY,
			},
			timeout: REQUEST_TIMEOUT,
		}),
	);

	const seasonDataRes = seasonsInfo?.data?.Items ?? [];
	// console.log(
	// 	`Series ${seriesId}: ${seasonDataRes.length} seasons found (took ${Date.now() - seasonsStart}ms)`,
	// );

	return Promise.all(
		seasonDataRes.map((season) =>
			nestedLimit(async () => {
				// const start = Date.now();
				let episodes = [];
				try {
					// console.log(
					// 	`  Fetching episodes for season ${season?.Id} (${season?.Name})...`,
					// );
					const episodesRes = await axios.get(
						`${process.env.JELLYFIN_LOCAL_URL}/Shows/${season?.SeriesId}/Episodes`,
						{
							params: {
								seasonId: season?.Id,
								userId: USER_ID,
								Fields:
									'ItemCounts,PrimaryImageAspectRatio,CanDelete,MediaSourceCount,Overview',
								apiKey: API_KEY,
							},
							timeout: REQUEST_TIMEOUT,
						},
					);

					episodes = (episodesRes?.data?.Items ?? []).map((ep) => ({
						_id: ep.Id,
						title: ep.Name,
						epNum: ep.IndexNumber,
						season: ep.SeasonName,
						rating: ep.OfficialRating,
						year: ep.ProductionYear,
						synopsis: ep.Overview,
						videoType: ep.Type,
					}));
					// console.log(
					// 	`  ✓ Season ${season?.Id}: ${episodes.length} episodes (took ${Date.now() - start}ms)`,
					// );
				} catch (err) {
					// console.log(
					// 	`  ✗ Failed to fetch episodes for season ${season?.Id} after ${Date.now() - start}ms: `,
					// 	err.message,
					// );
				}

				return {
					_id: season.Id,
					season: season.Name,
					seriesName: season.SeriesName,
					seriesId: season.SeriesId,
					year: season.ProductionYear,
					episodes,
					videoType: season.Type,
				};
			}),
		),
	);
};

const getSeriesInfo = async (folders) => {
	// console.log(`Fetching info for ${folders.length} series...`);
	const seriesInfo = await Promise.all(
		folders.map((folder) =>
			limit(async () => {
				// const start = Date.now();
				try {
					// console.log(`Fetching series: ${folder.Name}`);
					const seriesRes = await axios.get(
						`${process.env.JELLYFIN_LOCAL_URL}/Items/${folder.Id}`,
						{
							params: {
								userId: USER_ID,
								apiKey: API_KEY,
							},
							timeout: REQUEST_TIMEOUT,
						},
					);
					// console.log(
					// 	`✓ /Items/${folder.Id} (${folder.Name}) took ${Date.now() - start}ms`,
					// );
					const seriesResData = seriesRes?.data;

					// Runs outside this limit() call, but its own internal
					// requests (seasons + episodes) still share the same limiter.
					const seasonData = await getSeasons(seriesResData?.Id);

					// console.log(
					// 	`✓ Series done: ${seriesResData?.Name} (total ${Date.now() - start}ms)`,
					// );

					return {
						_id: seriesResData?.Id,
						title: seriesResData?.Name,
						rating: seriesResData?.OfficialRating,
						synopsis: seriesResData?.Overview,
						tagline: seriesResData?.Taglines?.[0] ?? null,
						genre: seriesResData?.Genres,
						year: seriesResData?.ProductionYear,
						trailer: seriesResData?.RemoteTrailers?.[0]?.Url ?? null,
						people: seriesResData?.People,
						tags: seriesResData?.Tags,
						logo: `https://server.nutzflix.net/api/assets/photos/${seriesResData?.Id}/logo.png`,
						backdrop: `https://server.nutzflix.net/api/assets/photos/${seriesResData?.Id}/backdrop.jpg`,
						poster: `https://server.nutzflix.net/api/assets/photos/${seriesResData?.Id}/poster.jpg`,
						videoType: seriesResData?.Type,
						seasons: seasonData,
					};
				} catch (err) {
					// console.log(
					// 	`✗ Failed for ${folder.Name} after ${Date.now() - start}ms: `,
					// 	err.message,
					// );
					return null;
				}
			}),
		),
	);

	return seriesInfo.filter(Boolean);
};

const shuffleArray = (arr) => {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const buildGenreLists = (movies) => {
	const lists = [];
	GENRE_NAMES.forEach((genre) => {
		lists.push({
			name: genre,
			movies: shuffleArray(
				movies.filter((movie) => movie.genre?.includes(genre)),
			),
		});
	});
	return lists;
};

const refreshVideoCache = async () => {
	const today = new Date().toDateString();

	if (lastRunDate === today) {
		console.log('Video cache already refreshed today, skipping');
		return cache;
	}

	console.log('Refreshing video cache...');

	const videoRes = await axios.get(
		`${process.env.JELLYFIN_LOCAL_URL}/Users/${USER_ID}/Items`,
		{
			params: {
				StartIndex: 0,
				Fields:
					'PrimaryImageAspectRatio,SortName,Path,ChildCount,MediaSourceCount',
				ImageTypeLimit: 1,
				ParentId: LIBRARY_PARENT_ID,
				SortBy: 'IsFolder,SortName',
				SortOrder: 'Ascending',
				apiKey: API_KEY,
			},
			timeout: REQUEST_TIMEOUT,
		},
	);

	const rawItems = videoRes.data.Items;

	const moviesRaw = rawItems.filter((v) => v.IsFolder === false);
	const seriesRaw = rawItems.filter((v) => v.IsFolder === true);

	console.log(
		`Fetching ${moviesRaw.length} movies, ${seriesRaw.length} series...`,
	);

	const movies = await getMovieInfo(moviesRaw);
	const series = await getSeriesInfo(seriesRaw);

	const allVideos = [...series, ...movies];

	cache = { allVideos, movies, series };
	lastRunDate = today;

	console.log(`Video cache refresh complete.`);

	return cache;
};

const scheduleVideoCache = () => {
	const msUntil2am = () => {
		const now = new Date();
		const next2am = new Date();
		next2am.setHours(2, 0, 0, 0);
		if (now >= next2am) next2am.setDate(next2am.getDate() + 1);
		return next2am - now;
	};

	const scheduleDailyRun = () => {
		const delay = msUntil2am();
		console.log(
			`Video cache scheduled. Next refresh in ${Math.round(delay / 1000 / 60)} minutes.`,
		);
		setTimeout(async () => {
			try {
				lastRunDate = null;
				await refreshVideoCache();
			} catch (err) {
				console.log('Scheduled video cache refresh failed:', err.message);
			}
			scheduleDailyRun();
		}, delay);
	};

	scheduleDailyRun();
};

const getCachedVideos = () => cache;

const withStreamUrls = (videos, apiKey) =>
	videos.map((video) => ({
		...video,
		streamURL: `https://server.nutzflix.net/Items/${video._id}/Download?apiKey=${apiKey}`,
	}));

module.exports = {
	refreshVideoCache,
	scheduleVideoCache,
	getCachedVideos,
	withStreamUrls,
};
