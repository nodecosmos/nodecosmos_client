import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: Boolean(localStorage.getItem('token')),
    userId: null,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    token: null,
  },
  reducers: {

    login(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        token: action.payload.token || state.token,
      };
    },
    logout(state, _action) {
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        currentUser: {},
        token: null,
      };
    },
  },
});

const { actions, reducer } = authenticationSlice;

export const {
  login,
  logout,
} = actions;

export default reducer;
