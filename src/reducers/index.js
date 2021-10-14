import { combineReducers } from 'redux';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import micronReducer from './micron-reducer';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  microns: micronReducer,
});
