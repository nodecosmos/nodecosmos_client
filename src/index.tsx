
import App from './features/app/components/App';
import store from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import './themes/fonts/roboto/300.css';
import './themes/fonts/roboto/400.css';
import './themes/fonts/roboto/500.css';
import './themes/fonts/roboto/700.css';
import './syntax.css';

const container = document.getElementById('root');

if (!container) {
    throw new Error('No container found');
}

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GoogleOAuthProvider>
    </Provider>,
);
