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
	lists: null,
	selectedVideo: null,
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
			state.lists = action.payload.lists;
		},
		setSelectedVideo: (state, action) => {
			state.selectedVideo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => {
			return initialState;
		});
	},
});

export const {
	setSynopsis,
	setRunTime,
	setVidTitle,
	setYear,
	setIsSeries,
	setSeriesType,
	setSeriesTitle,
	setSeason,
	setEpisode,
	setVideos,
	setSelectedVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
