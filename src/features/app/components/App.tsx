import Loader from '../../../common/components/Loader';
import Home from '../../../pages/home/Index';
import dimmed from '../../../themes/dimmed';
import getTheme, { themes } from '../../../themes/theme';
import { selectTheme } from '../app.selectors';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
    Route, Routes, useLocation,
} from 'react-router-dom';
/* nodecosmos */
/* sx */

const LazyAppLoad = React.lazy(() => import('./LazyAppLoad'));

export default function App() {
    const theme = useSelector(selectTheme);
    const currentTheme = themes[theme];
    const location = useLocation();

    const isHomepage = location.pathname === '/';
    // @ts-expect-error TODO: fix types
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isHomepage && isDevelopment) {
        return (
            <Suspense fallback={(
                <Loader
                    backgroundColor={currentTheme.palette.background.paper}
                    color={currentTheme.palette.primary.main}
                />
            )}
            >
                <LazyAppLoad />
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
