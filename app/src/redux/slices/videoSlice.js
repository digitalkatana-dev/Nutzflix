import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { logout } from './userSlice';

export const videoAdapter = createEntityAdapter();
const initialState = videoAdapter.getInitialState({
	loading: false,
	allVideos: null,
	movies: null,
	series: null,
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
			state.movies = action.payload.movies;
			state.series = action.payload.series;
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
			state.searchResults = state.movies.filter((movie) => {
				const title = movie.title.toLowerCase() ?? '';
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
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => {
			return initialState;
		});
	},
});

export const {
	setVideos,
	setSearchTerm,
	videoSearch,
	setSelectedVideo,
	setSelectedSeries,
	setSelectedSeason,
	clearSearchResults,
	clearAllSelected,
} = videoSlice.actions;

export default videoSlice.reducer;
