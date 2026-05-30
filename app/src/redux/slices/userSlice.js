import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import nutzflixApi from '../../api/nutflixApi';

export const userAuth = createAsyncThunk(
	'user/auth',
	async (data, { rejectWithValue }) => {
		try {
			const res = await nutzflixApi.post('/users/auth', data);
			const { token, userProfile, success } = res.data;
			console.log('Response', res.data);
			localStorage.setItem('token', token);
			return { userProfile, success };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const addSubscriber = createAsyncThunk(
	'user/add_sub',
	async (data, { rejectWithValue }) => {
		try {
			const res = await nutzflixApi.post('/users/add_sub', data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	activeUser: null,
	username: '',
	email: '',
	userSuccess: null,
	userErrors: null,
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
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
			localStorage.removeItem('token');
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
	extraReducers: (builder) => {
		builder
			.addCase(userAuth.pending, (state) => {
				state.loading = true;
				state.userErrors = null;
			})
			.addCase(userAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.activeUser = action.payload.userProfile;
				state.userSuccess = action.payload.success;
				state.userErrors = null;
			})
			.addCase(userAuth.rejected, (state, action) => {
				state.loading = false;
				state.userErrors = action.payload;
			})
			.addCase(addSubscriber.pending, (state) => {
				state.loading = true;
				state.userErrors = null;
			})
			.addCase(addSubscriber.fulfilled, (state, action) => {
				state.loading = false;
				state.userSuccess = action.payload;
				state.username = '';
				state.email = '';
				state.userErrors = null;
			})
			.addCase(addSubscriber.rejected, (state, action) => {
				state.loading = false;
				state.userErrors = action.payload;
			})
			.addCase(PURGE, () => {
				localStorage.removeItem('token');
				return initialState;
			});
	},
});

export const {
	setUsername,
	setEmail,
	setActiveUser,
	logout,
	clearUserErrors,
	clearUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
