import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './fonts/roboto/400.css';
import './fonts/roboto/500.css';
import './fonts/roboto/700.css';

import './fonts/roboto-mono/400.css';
import './fonts/roboto-mono/700.css';

import './fonts/montserrat/500.css';
import './fonts/montserrat/700.css';
import './fonts/montserrat/900.css';

/* nodecosmos */
import App from './features/app/components/App';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
