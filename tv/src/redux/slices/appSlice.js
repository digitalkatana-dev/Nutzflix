import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState({
  loading: false,
  focusedKey: null,
  appSuccess: null,
  appErrors: null,
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFocusedKey: (state, action) => {
      state.focusedKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'user/logout/fulfilled',
      () => initialState,
    );
  },
});

export const { setFocusedKey } = appSlice.actions;

export default appSlice.reducer;
