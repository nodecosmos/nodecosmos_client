import App from './features/app/components/App';
import store from './store';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import '@fontsource/comfortaa';
import './themes/fonts/cherry-bomb-one/400.css';
import './themes/fonts/roboto/300.css';
import './themes/fonts/roboto/400.css';
import './themes/fonts/roboto/500.css';
import './themes/fonts/roboto/700.css';
import './themes/fonts/montserrat/500.css';
import './themes/fonts/montserrat/700.css';
import './themes/fonts/montserrat/900.css';

const container = document.getElementById('root');

if (!container) {
    throw new Error('No container found');
}

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
