import { createSlice } from '@reduxjs/toolkit';
import { syncUpCurrentUser } from './authentication.thunks';

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: Boolean(localStorage.getItem('currentUser')),
    /**
     * @type {{
     *   id: String,
     *   email: String,
     *   firstName: String,
     * }}
     */
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
  },
  reducers: {
    login(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
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
        if (action.payload.success) {
          localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
        } else {
          localStorage.removeItem('currentUser');
        }

        return {
          ...state,
          isAuthenticated: action.payload.success,
          currentUser: (action.payload.success && action.payload.user) || null,
        };
      })
      .addCase(syncUpCurrentUser.rejected, (state, _action) => {
        authenticationSlice.caseReducers.logout(state);
        localStorage.removeItem('currentUser');
      });
  },
});

const { actions, reducer } = authenticationSlice;

export const {
  login,
  logout,
} = actions;

export default reducer;
