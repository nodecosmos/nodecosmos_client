import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authentication/authenticationSlice';
import nodesSlice from './features/nodes/nodeSlice';
import appSlice from './features/app/appSlice';

export default combineReducers({
  app: appSlice,
  auth: authSlice,
  nodes: nodesSlice,
});
