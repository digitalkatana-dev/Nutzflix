import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { setVideos } from './videoSlice';
import nutzflixApi from '../../api/nutflixApi';

export const userAuth = createAsyncThunk(
  'user/auth',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await nutzflixApi.post('/api/users/auth', data);
      const { token, userProfile, video, success } = res.data;
      localStorage.setItem('token', token);
      dispatch(setVideos(video));
      return { userProfile, success };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const generatePasswordToken = createAsyncThunk(
  'user/generate_password_token',
  async (data, { rejectWithValue }) => {
    try {
      const res = await nutzflixApi.post(
        '/api/users/generate-password-token',
        data,
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'user/reset_password',
  async (data, { rejectWithValue }) => {
    try {
      const res = await nutzflixApi.post('/api/users/reset-password', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const addSubscriber = createAsyncThunk(
  'user/add_sub',
  async (data, { rejectWithValue }) => {
    try {
      const res = await nutzflixApi.post('/api/users/register', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const addRemoveFavorite = createAsyncThunk(
  'user/add_remove_favorite',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await nutzflixApi.put(
        `/api/profiles/${data}/add-remove-favorite`,
      );
      const { updatedProfile, video, success } = res.data;
      dispatch(setVideos(video));
      return { updatedProfile, success };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
  loading: false,
  activeUser: null,
  firstName: '',
  email: '',
  password: '',
  apiKey: '',
  allUsers: [],
  userSuccess: null,
  userErrors: null,
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    logout: () => {
      localStorage.removeItem('token');
      return initialState;
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
      .addCase(generatePasswordToken.pending, (state) => {
        state.loading = true;
        state.userErrors = null;
      })
      .addCase(generatePasswordToken.fulfilled, (state, action) => {
        state.loading = false;
        state.userSuccess = action.payload;
      })
      .addCase(generatePasswordToken.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.userErrors = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userSuccess = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      })
      .addCase(addSubscriber.pending, (state) => {
        state.loading = true;
        state.userErrors = null;
      })
      .addCase(addSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        state.userSuccess = action.payload.success;
        state.allUsers = [...state.allUsers, action.payload];
        state.firstName = '';
        state.email = '';
        state.password = '';
        state.apiKey = '';
        state.userErrors = null;
      })
      .addCase(addSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      })
      .addCase(addRemoveFavorite.pending, (state) => {
        state.loading = true;
        state.userErrors = null;
      })
      .addCase(addRemoveFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.activeUser = action.payload.updatedProfile;
        state.userSuccess = action.payload.success;
        state.userErrors = null;
      })
      .addCase(addRemoveFavorite.rejected, (state, action) => {
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
  setFirstName,
  setEmail,
  setPassword,
  setApiKey,
  logout,
  clearUserErrors,
  clearUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
