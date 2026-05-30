import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { logout } from './userSlice';
import nutzflixApi from '../../api/nutflixApi';

export const videoAdapter = createEntityAdapter();
const initialState = videoAdapter.getInitialState({
	loading: false,
	vidTitle: '',
	synopsis: '',
	year: '',
	runTime: '',
	isSeries: false,
	seriesType: '',
	seriesTitle: '',
	season: '',
	episode: '',
	videos: null,
	selectedVideo: null,
	videoSuccess: null,
	videoErrors: null,
});

export const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setVidTitle: (state, action) => {
			state.vidTitle = action.payload;
		},
		setSynopsis: (state, action) => {
			state.synopsis = action.payload;
		},
		setYear: (state, action) => {
			state.year = action.payload;
		},
		setRunTime: (state, action) => {
			state.runTime = action.payload;
		},
		setIsSeries: (state, action) => {
			state.isSeries = action.payload;
		},
		setSeriesType: (state, action) => {
			state.seriesType = action.payload;
		},
		setSeriesTitle: (state, action) => {
			state.seriesTitle = action.payload;
		},
		setSeason: (state, action) => {
			state.season = action.payload;
		},
		setEpisode: (state, action) => {
			state.episode = action.payload;
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
} = videoSlice.actions;

export default videoSlice.reducer;
