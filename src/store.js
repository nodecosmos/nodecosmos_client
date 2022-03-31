import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// noinspection JSUnresolvedVariable
const enhancer = compose(
  // eslint-disable-next-line no-underscore-dangle
  applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default createStore(reducers, enhancer);
