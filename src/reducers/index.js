import { combineReducers } from 'redux';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import nodeReducer from './node-reducer';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  nodes: nodeReducer,
});
