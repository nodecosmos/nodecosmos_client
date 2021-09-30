// import microcosmos, { setAuthorizationToken } from '../apis/microcosmos-server';
// import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
} from './types';

/* User Actions */
export const login = (payload) => ({ type: SIGN_IN, payload });
export const logout = () => ({ type: SIGN_OUT });
