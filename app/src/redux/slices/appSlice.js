import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'dark',
	// activeUser: { id: 1, name: 'Jim' },
	activeUser: null,
	appSuccess: null,
	appErrors: null,
});

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		resetApp: (state) => {
			state.loading = false;
			state.theme = 'dark';
			state.activeUser = null;
			state.appSuccess = null;
			state.appErrors = null;
		},
		clearSuccess: (state) => {
			state.appSuccess = null;
		},
		clearErrors: (state) => {
			state.appErrors = null;
		},
	},
});

export const { setTheme, resetApp, clearSuccess, clearErrors } =
	appSlice.actions;

export default appSlice.reducer;
