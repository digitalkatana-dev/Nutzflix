import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	activeUser: null,
	userSuccess: null,
	userErrors: null,
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setActiveUser: (state) => {
			state.activeUser = {
				_id: '67c1dd076e664c821c40e936',
				theme: 'dark',
				showForm: false,
				showHome: true,
				showGenerator: true,
				user: '67c1dd066e664c821c40e934',
				createdAt: '2025-02-28T15:57:59.291Z',
				updatedAt: '2026-02-01T07:05:36.827Z',
				__v: 0,
				bridgeExt: '6043',
				bridgeNumber: '8587691831',
				bridgePin: '1831',
				firstName: 'Brandon',
				phoneExt: '1837',
				phoneNumber: '8587691837',
				warden: 'ZDlsQ2x0ciQwIWxC',
				windows: 'aFEkNTJFTW1SSWRnaUg=',
				appPin: '330622076',
				msAcct: 'ZXQ5YVVRcV52RSRmZUM=',
			};
		},
		logout: (state) => {
			state.loading = false;
			state.activeUser = null;
			state.userSuccess = null;
			state.userErrors = null;
		},
		clearUserSuccess: (state) => {
			state.userSuccess = null;
		},
		clearUserErrors: (state) => {
			state.userErrors = null;
		},
	},
});

export const { setActiveUser, logout, clearUserErrors, clearUserSuccess } =
	userSlice.actions;

export default userSlice.reducer;
