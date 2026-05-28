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
	synopsis: '',
	runTime: '',
	vidTitle: '',
	year: '',
	isSeries: false,
	seriesType: '',
	seriesTitle: '',
	videos: null,
	selectedVideo: null,
	videoSuccess: null,
	videoErrors: null,
});

export const videoSlice = createSlice({
	name: 'video',
	initialState,
	reducers: {
		setSynopsis: (state, action) => {
			state.synopsis = action.payload;
		},
		setRunTime: (state, action) => {
			state.runTime = action.payload;
		},
		setVidTitle: (state, action) => {
			state.vidTitle = action.payload;
		},
		setYear: (state, action) => {
			state.year = action.payload;
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
} = videoSlice.actions;

export default videoSlice.reducer;
