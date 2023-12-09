import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type NodecosmosDispatch = typeof store.dispatch;

export default store;

export type RootState = ReturnType<typeof store.getState>;
