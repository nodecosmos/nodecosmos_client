import { selectTheme } from '../../features/app/app.selectors';
import store from '../../store';
import getTheme, { themes } from '../../themes/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactNode, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';

export default function useRootCreator(children: ReactNode) {
    const theme = useSelector(selectTheme);
    const currentTheme = themes[theme];

    return useCallback((container: HTMLElement) => {
        const root = createRoot(container);

        root.render(
            <Provider store={store}>
                <ThemeProvider theme={getTheme(currentTheme)}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </Provider>,
        );
    }, [children, currentTheme]);
}
