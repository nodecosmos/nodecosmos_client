import {
  SIGN_IN, SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  userId: null,
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
  token: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        token: action.payload.token || state.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        currentUser: {},
        token: null,
      };
    default:
      return state;
  }
};
