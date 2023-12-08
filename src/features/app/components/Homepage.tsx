import Home from '../../../pages/home/Index';
import dimmed from '../../../themes/dimmed';
import getTheme from '../../../themes/theme';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import React, { Suspense } from 'react';
import {
    Route, Routes, useLocation,
} from 'react-router-dom';
/* nodecosmos */
/* sx */

const App = React.lazy(() => import('./App'));

export default function Homepage() {
    const location = useLocation();

    const isHomepage = location.pathname === '/';
    // @ts-expect-error TODO: fix types
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isHomepage && isDevelopment) {
        return (
            <Suspense fallback={null}>
                <App />
            </Suspense>
        );
    }

    // only homepage
    return (
        <ThemeProvider theme={getTheme(dimmed)}>
            <CssBaseline />
            <Box
                height={1}
                width={1}
                sx={{ backgroundColor: 'background.1' }}
            >
                <Box
                    component="div"
                    height={1}
                    width={1}
                    boxShadow="8"
                    border={1}
                    borderColor="borders.2"
                    sx={{ backgroundColor: 'background.2' }}
                >
                    <Routes>
                        <Route path="/" element={(<Home />)} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
