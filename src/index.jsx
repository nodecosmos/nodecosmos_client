import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@fontsource/roboto';

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
