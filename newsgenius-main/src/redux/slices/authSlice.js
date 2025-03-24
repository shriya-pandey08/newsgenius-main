import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleSignupStart(state) {
      state.loading = true;
      state.error = null;
    },
    googleSignupSuccess(state, action) {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };

      state.loading = false;
    },
    googleSignupFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { googleSignupStart, googleSignupSuccess, googleSignupFailure } = authSlice.actions;

export default authSlice.reducer;
