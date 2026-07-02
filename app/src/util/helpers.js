import { jwtDecode } from 'jwt-decode';

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

const shuffleArray = (arr) => {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const isTokenExpired = (token) => {
	if (!token) return true;

	try {
		const { exp } = jwtDecode(token);
		return Date.now() >= exp * 1000;
	} catch (e) {}
};

export const objectMatch = (obj1, obj2) => {
	const sortedKeys1 = Object.keys(obj1).sort();
	const sortedKeys2 = Object.keys(obj2).sort();

	if (sortedKeys1.length !== sortedKeys2.length) {
		return false;
	}

	for (let i = 0; i < sortedKeys1.length; i++) {
		const key1 = sortedKeys1[i];
		const key2 = sortedKeys2[i];

		if (key1 !== key2) {
			return false;
		}

		const val1 = obj1[key1];
		const val2 = obj2[key2];

		if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object') {
			if (!objectMatch(val1, val2)) {
				return false;
			}
		} else if (val1 !== val2) {
			return false;
		}
	}

	return true;
};

export const getEmbedUrl = (youtubeUrl) => {
	const match = youtubeUrl.match(/(?:v=|youtu\.be\/)([^&]+)/);
	const videoId = match ? match[1] : null;

	if (!videoId) return null;

	const params = new URLSearchParams({
		autoplay: '1',
		mute: '1', // required by browsers for autoplay to work
		controls: '0', // hides YouTube's control bar
		modestbranding: '1',
		loop: '1',
		playlist: videoId, // required for loop to work on a single video
		playsinline: '1',
		rel: '0', // don't show related videos at the end
	});

	return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const buildGenreLists = (movies) => {
	const lists = [];
	GENRE_NAMES.forEach((genre) => {
		lists.push({
			name: genre,
			movies: shuffleArray(
				movies?.filter((movie) => movie.genre?.includes(genre)),
			),
		});
	});
	return lists;
};
