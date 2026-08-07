import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { logout } from './userSlice';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
	loading: false,
	theme: 'dark',
	drawerOpen: false,
	roles: ['superAdmin', 'admin'],
	appSuccess: null,
	appErrors: null,
});

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setDrawerOpen: (state, action) => {
			state.drawerOpen = action.payload;
		},
		setIsClosing: (state, action) => {
			state.isClosing = action.payload;
		},
		resetApp: (state) => {
			state.loading = false;
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
			state.drawerOpen = false;
			state.isClosing = false;
			state.appSuccess = null;
			state.appErrors = null;
		});
	},
});

export const { setDrawerOpen, resetApp, clearAppSuccess, clearAppErrors } =
	appSlice.actions;

export default appSlice.reducer;
