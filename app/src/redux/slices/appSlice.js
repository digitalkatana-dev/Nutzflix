import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'dark',
	drawerOpen: false,
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
		setDrawerOpen: (state, action) => {
			state.drawerOpen = !state.drawerOpen;
		},
		resetApp: (state) => {
			state.loading = false;
			state.theme = 'dark';
			state.appSuccess = null;
			state.appErrors = null;
		},
		clearAppSuccess: (state) => {
			state.appSuccess = null;
		},
		clearAppErrors: (state) => {
			state.appErrors = null;
		},
	},
});

export const {
	setTheme,
	setDrawerOpen,
	resetApp,
	clearAppSuccess,
	clearAppErrors,
} = appSlice.actions;

export default appSlice.reducer;
