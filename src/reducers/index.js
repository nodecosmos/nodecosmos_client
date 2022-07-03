import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth-reducer';
import nodesSlice from '../features/nodes/nodeSlice';
import appSlice from '../features/app/appSlice';

export default combineReducers({
  app: appSlice,
  auth: authReducer,
  nodes: nodesSlice,
});
