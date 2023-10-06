import { createSlice } from '@reduxjs/toolkit';
import { logOut, syncUpCurrentUser } from './authentication.thunks';

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
    currentUser: JSON.parse(localStorage.getItem('currentUser'), (key, value) => {
      if (key === 'lastSyncUpAt') {
        return new Date(value);
      }
      return value;
    }),
  },
  reducers: {
    login(state, action) {
      const { user } = action.payload;
      user.lastSyncUpAt = new Date();

      localStorage.setItem('currentUser', JSON.stringify(user));

      return {
        ...state,
        isAuthenticated: true,
        currentUser: user,
      };
    },
    logout(state, _action) {
      localStorage.removeItem('currentUser');

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
          const { user } = action.payload;
          user.lastSyncUpAt = new Date();

          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }

        state.isAuthenticated = action.payload.success;
        state.currentUser = (action.payload.success && action.payload.user) || null;
      })
      .addCase(logOut.fulfilled, (state, _action) => {
        localStorage.removeItem('currentUser');

        return authenticationSlice.caseReducers.logout(state);
      });
  },
});

const { actions, reducer } = authenticationSlice;

export const {
  login,
  logout,
} = actions;

export default reducer;
