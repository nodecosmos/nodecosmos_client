import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { syncUpCurrentUser } from './authentication.thunks';

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: Boolean(localStorage.getItem('token')),
    /**
     * @type {{
     *   id: String,
     *   email: String,
     *   firstName: String,
     * }}
     */
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    token: localStorage.getItem('token') || '',
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
        currentUser: {},
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(syncUpCurrentUser.fulfilled, (state, action) => {
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          currentUser: action.payload,
        };
      })
      .addCase(syncUpCurrentUser.rejected, (state, action) => {
        switch (action.payload) {
          case 'session_expired':
          case 'decode_error':
            authenticationSlice.caseReducers.logout(state);
            redirect('/auth/login');
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            break;
          default:
            authenticationSlice.caseReducers.logout(state);
        }
      });
  },
});

const { actions, reducer } = authenticationSlice;

export const {
  login,
  logout,
} = actions;

export default reducer;
