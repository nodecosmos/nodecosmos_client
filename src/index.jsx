import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
/* nodecosmos */
import App from './features/app/components/App';
import store from './store';

//----------------------------------------------------------------------------------------------------------------------
import './index.css';
/* fonts */
import './fonts/roboto/400.css';
import './fonts/roboto/500.css';
import './fonts/roboto/700.css';

import './fonts/montserrat/500.css';
import './fonts/montserrat/700.css';
import './fonts/montserrat/900.css';
/* icons */

//----------------------------------------------------------------------------------------------------------------------
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
