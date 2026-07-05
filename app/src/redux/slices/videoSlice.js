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
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => {
			return initialState;
		});
	},
});

export const { setVideos, videoSearch, setSelectedVideo, clearSearchResults } =
	videoSlice.actions;

export default videoSlice.reducer;
