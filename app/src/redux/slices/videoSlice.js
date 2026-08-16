import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { logout } from './userSlice';
import { shuffleArray } from '../../util/helpers';
import nutzflixApi from '../../api/nutflixApi';

export const getVideos = createAsyncThunk(
	'video/get_videos',
	async (_, { rejectWithValue }) => {
		try {
			const res = await nutzflixApi.get('/api/videos');
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const videoAdapter = createEntityAdapter();
const initialState = videoAdapter.getInitialState({
	loading: false,
	allVideos: [],
	movies: [],
	series: [],
	lastFetched: null,
	featured: null,
	selectedVideo: null,
	selectedSeries: null,
	selectedSeason: null,
	searchTerm: '',
	searchResults: [],
	videoSuccess: null,
	videoErrors: null,
});

export const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setVideos: (state, action) => {
			state.allVideos = action.payload.allVideos;
			state.featured = shuffleArray(action.payload.movies)[0];
			state.movies = action.payload.movies;
			state.series = action.payload.series;
			state.lastFetched = Date.now();
		},
		setFeatured: (state, action) => {
			state.featured = action.payload;
		},
		setSelectedVideo: (state, action) => {
			state.selectedVideo = action.payload;
		},
		setSelectedSeries: (state, action) => {
			state.selectedSeries = action.payload;
		},
		setSelectedSeason: (state, action) => {
			state.selectedSeason = action.payload;
		},
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
		videoSearch: (state, action) => {
			const queryWords = action.payload
				.toLowerCase()
				.split(' ')
				.filter(Boolean);
			state.searchResults = state.allVideos.filter((video) => {
				const title = video.title.toLowerCase() ?? '';
				return queryWords.every((word) => title.includes(word));
			});
		},
		movieSearch: (state, action) => {
			const queryWords = action.payload
				.toLowerCase()
				.split(' ')
				.filter(Boolean);
			state.searchResults = state.movies.filter((movie) => {
				const title = movie.title.toLowerCase() ?? '';
				return queryWords.every((word) => title.includes(word));
			});
		},
		seriesSearch: (state, action) => {
			const queryWords = action.payload
				.toLowerCase()
				.split(' ')
				.filter(Boolean);
			state.searchResults = state.series.filter((series) => {
				const title = series.title.toLowerCase() ?? '';
				return queryWords.every((word) => title.includes(word));
			});
		},
		clearSearchResults: (state) => {
			state.searchResults = [];
		},
		clearAllSelected: (state) => {
			state.selectedVideo = null;
			state.selectedSeries = null;
			state.selectedSeason = null;
			state.searchTerm = '';
			state.searchResults = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getVideos.pending, (state) => {
				state.loading = true;
				state.videoErrors = null;
			})
			.addCase(getVideos.fulfilled, (state, action) => {
				state.loading = false;
				state.allVideos = action.payload.allVideos ?? [];
				state.movies = action.payload.movies ?? [];
				state.series = action.payload.series ?? [];
				state.lastFetched = Date.now();
			})
			.addCase(getVideos.rejected, (state, action) => {
				state.loading = false;
				state.videoErrors = action.payload;
			})
			.addCase(logout, () => {
				return initialState;
			});
	},
});

export const {
	setVideos,
	setSearchTerm,
	videoSearch,
	movieSearch,
	seriesSearch,
	setFeatured,
	setSelectedVideo,
	setSelectedSeries,
	setSelectedSeason,
	clearSearchResults,
	clearAllSelected,
} = videoSlice.actions;

export default videoSlice.reducer;
