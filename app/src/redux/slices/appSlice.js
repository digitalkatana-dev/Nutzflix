import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { logout } from './userSlice';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'dark',
	viewMode: 'admin',
	drawerOpen: false,
	isClosing: false,
	roles: ['superAdmin', 'admin'],
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
		setViewMode: (state, action) => {
			state.viewMode = action.payload;
		},
		setDrawerOpen: (state, action) => {
			state.drawerOpen = action.payload;
		},
		setIsClosing: (state, action) => {
			state.isClosing = action.payload;
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
	extraReducers: (builder) => {
		builder.addCase(logout, (state) => {
			state.theme = 'dark';
			state.viewMode = 'admin';
			state.drawerOpen = false;
			state.isClosing = false;
			state.appSuccess = null;
			state.appErrors = null;
		});
	},
});

export const {
	setTheme,
	setViewMode,
	setDrawerOpen,
	setIsClosing,
	resetApp,
	clearAppSuccess,
	clearAppErrors,
} = appSlice.actions;

export default appSlice.reducer;
